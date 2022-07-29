import {
  NotificationType,
  Post,
  Tag,
  TagPostRelation as TagPostRelationType,
} from '@prisma/client'
import { Context } from '../../context'
import { matchPosts } from '../../logics'

const createNotification = async (
  ctx: Context,
  tagPostRelations: (TagPostRelationType & {
    post: Post
    tag: Tag
  })[],
  post: Post
) => {
  const matchingPostsInfo = await matchPosts(ctx, tagPostRelations, post)

  await ctx.prisma.notification.createMany({
    data: [
      ...matchingPostsInfo.map((matchingPostInfo) => {
        return {
          type: 'MATCH_POST' as NotificationType,
          targetUserId: matchingPostInfo.post.createdUserId,
          message: `「${matchingPostInfo.post.title}」が「${post.title}」とマッチしました`,
          url: `/post/${post.id}`,
          isChecked: false,
        }
      }),
    ],
  })
}

export const getTagPostRelationsResolver = (
  _parent: {},
  args: {
    postId?: string | null
    tagId?: string | null
  },
  ctx: Context
) => {
  const query: Partial<TagPostRelationType> = {}
  if (args.tagId) query.tagId = args.tagId
  if (args.postId) query.postId = args.postId

  return ctx.prisma.tagPostRelation.findMany({
    where: query,
    include: {
      tag: true,
      post: true,
    },
  })
}

export const createTagPostRelationResolver = async (
  _parent: {},
  args: {
    postId: string
    tagId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tag = await ctx.prisma.tag.findUnique({
    where: {
      id: args.tagId,
    },
  })

  const post = await ctx.prisma.post.findUnique({
    where: {
      id: args.postId,
    },
  })

  if (!tag || !post) {
    throw new Error('タグ、または投稿が存在しません')
  }

  if (ctx.user.id !== post.createdUserId) {
    throw new Error('作成者しかタグを追加できません')
  }

  return ctx.prisma.tagPostRelation.create({
    data: {
      tagId: args.tagId,
      postId: args.postId,
    },
    include: {
      tag: true,
      post: true,
    },
  })
}

export const createTagPostRelationsResolver = async (
  _parent: {},
  args: {
    postId: string
    tagIds: string[]
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await ctx.prisma.post.findUnique({
    where: {
      id: args.postId,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (ctx.user.id !== post.createdUserId) {
    throw new Error('投稿の作成者しかタグを追加できません')
  }

  const tagPostTypes = args.tagIds.map((tagId: string) => {
    return {
      tagId,
      postId: args.postId,
    }
  })

  await ctx.prisma.tagPostRelation.createMany({
    data: tagPostTypes,
  })

  const tagPostRelations = await ctx.prisma.tagPostRelation.findMany({
    where: {
      OR: tagPostTypes,
    },
    include: {
      tag: true,
      post: true,
    },
  })

  // 非同期に処理
  createNotification(ctx, tagPostRelations, post)

  return tagPostRelations
}

export const deleteTagPostRelationResolver = async (
  _parent: {},
  args: {
    postId: string
    tagId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tagPostRelation = await ctx.prisma.tagPostRelation.findUnique({
    where: {
      tagPostRelationId: {
        tagId: args.tagId,
        postId: args.postId,
      },
    },
    include: {
      post: true,
    },
  })

  if (!tagPostRelation) {
    throw new Error('tagPostRelationが存在しません')
  }

  if (ctx.user.id !== tagPostRelation.post.createdUserId) {
    throw new Error('作成者しかタグを削除できません')
  }

  return ctx.prisma.tagPostRelation.delete({
    where: {
      tagPostRelationId: {
        tagId: args.tagId,
        postId: args.postId,
      },
    },
    include: {
      tag: true,
      post: true,
    },
  })
}

export const deleteTagPostRelationsResolver = async (
  _parent: {},
  args: {
    tagPostTypes: {
      postId: string
      tagId: string
    }[]
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tagPostRelations = await ctx.prisma.tagPostRelation.findMany({
    where: {
      OR: [...args.tagPostTypes],
    },
    include: {
      tag: true,
      post: true,
    },
  })

  if (
    tagPostRelations.some(
      (
        tagPostRelation: TagPostRelationType & {
          post: Post
          tag: Tag
        }
      ) => ctx.user?.id !== tagPostRelation.post.createdUserId
    )
  ) {
    throw new Error('作成者しかタグを削除できません')
  }

  await ctx.prisma.tagPostRelation.deleteMany({
    where: {
      OR: [...args.tagPostTypes],
    },
  })

  return tagPostRelations
}

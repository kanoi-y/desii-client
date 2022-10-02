import {
  NotificationType,
  Post,
  Tag,
  TagPostRelation as TagPostRelationType,
  User,
} from '@prisma/client'
import { prisma } from '../../../lib/prisma'
import { matchPosts } from '../../logics'

export const createNotification = async (
  tagPostRelations: (TagPostRelationType & {
    post: Post
    tag: Tag
  })[],
  post: Post,
  user: User
) => {
  const matchingPostsInfo = await matchPosts(tagPostRelations, post, user)

  await prisma.notification.createMany({
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

export const getTagPostRelationsResolver = ({
  postId,
  tagId,
}: {
  postId?: string | null
  tagId?: string | null
}) => {
  const query: Partial<TagPostRelationType> = {}
  if (tagId) query.tagId = tagId
  if (postId) query.postId = postId

  return prisma.tagPostRelation.findMany({
    where: query,
    include: {
      tag: true,
      post: true,
    },
  })
}

export const createTagPostRelationResolver = async ({
  postId,
  tagId,
  user,
}: {
  postId: string
  tagId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: tagId,
    },
  })

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!tag || !post) {
    throw new Error('タグ、または投稿が存在しません')
  }

  if (user.id !== post.createdUserId) {
    throw new Error('作成者しかタグを追加できません')
  }

  return prisma.tagPostRelation.create({
    data: {
      tagId,
      postId,
    },
    include: {
      tag: true,
      post: true,
    },
  })
}

export const createTagPostRelationsResolver = async ({
  postId,
  tagIds,
  user,
}: {
  postId: string
  tagIds: string[]
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (user.id !== post.createdUserId) {
    throw new Error('投稿の作成者しかタグを追加できません')
  }

  const tagPostTypes = tagIds.map((tagId: string) => {
    return {
      tagId,
      postId,
    }
  })

  await prisma.tagPostRelation.createMany({
    data: tagPostTypes,
  })

  const tagPostRelations = await prisma.tagPostRelation.findMany({
    where: {
      OR: tagPostTypes,
    },
    include: {
      tag: true,
      post: true,
    },
  })

  // 非同期に処理
  createNotification(tagPostRelations, post, user)

  return tagPostRelations
}

export const deleteTagPostRelationResolver = async ({
  postId,
  tagId,
  user,
}: {
  postId: string
  tagId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tagPostRelation = await prisma.tagPostRelation.findUnique({
    where: {
      tagPostRelationId: {
        tagId,
        postId,
      },
    },
    include: {
      post: true,
    },
  })

  if (!tagPostRelation) {
    throw new Error('tagPostRelationが存在しません')
  }

  if (user.id !== tagPostRelation.post.createdUserId) {
    throw new Error('作成者しかタグを削除できません')
  }

  return prisma.tagPostRelation.delete({
    where: {
      tagPostRelationId: {
        tagId,
        postId,
      },
    },
    include: {
      tag: true,
      post: true,
    },
  })
}

export const deleteTagPostRelationsResolver = async ({
  tagPostTypes,
  user,
}: {
  tagPostTypes: {
    postId: string
    tagId: string
  }[]
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const tagPostRelations = await prisma.tagPostRelation.findMany({
    where: {
      OR: [...tagPostTypes],
    },
    include: {
      tag: true,
      post: true,
    },
  })

  if (tagPostRelations.length === 0) {
    throw new Error('tagPostRelationが存在しません')
  }

  if (
    tagPostRelations.some(
      (
        tagPostRelation: TagPostRelationType & {
          post: Post
          tag: Tag
        }
      ) => user.id !== tagPostRelation.post.createdUserId
    )
  ) {
    throw new Error('作成者しかタグを削除できません')
  }

  await prisma.tagPostRelation.deleteMany({
    where: {
      OR: [...tagPostTypes],
    },
  })

  return tagPostRelations
}

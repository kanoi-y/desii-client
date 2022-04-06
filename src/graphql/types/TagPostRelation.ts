import {
  NotificationType,
  Post,
  Tag,
  TagPostRelation as TagPostRelationType,
} from '@prisma/client'
import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Context } from '../context'

export const TagPostInputType = inputObjectType({
  name: 'TagPostInputType',
  definition(t) {
    t.nonNull.string('tagId')
    t.nonNull.string('postId')
  },
})

export const TagPostRelation = objectType({
  name: 'TagPostRelation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('tagId')
    t.nonNull.string('postId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('tag', {
      type: 'Tag',
    })
    t.nonNull.field('post', {
      type: 'Post',
    })
  },
})

export const GetTagPostRelationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagId: stringArg(),
        postId: stringArg(),
      },
      resolve(_parent, args, ctx) {
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
      },
    })
  },
})

export const CreateTagPostRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTagPostRelation', {
      type: 'TagPostRelation',
      args: {
        tagId: nonNull(stringArg()),
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

// TODO: マッチングの部分の処理を切り分ける
const createNotification = async (
  ctx: Context,
  tagPostRelations: (TagPostRelationType & {
    post: Post
    tag: Tag
  })[],
  post: Post
) => {
  const matchingPostsInfo: { count: number; post: Post }[] = []

  const res = (
    await Promise.all(
      tagPostRelations.map(
        (
          tagPostRelation: TagPostRelationType & {
            tag: Tag
          }
        ) => {
          return ctx.prisma.tagPostRelation.findMany({
            where: {
              tagId: tagPostRelation.tag.id,
              NOT: {
                postId: post.id,
              },
            },
            include: {
              post: true,
            },
          })
        }
      )
    )
  ).flat()

  //FIXME: 処理が重くなってきたら修正する
  res.forEach((tagPostRelation) => {
    const index = matchingPostsInfo.findIndex(
      (matchingPostInfo: { count: number; post: Post }) =>
        matchingPostInfo.post.id === tagPostRelation.postId
    )

    if (index > -1) {
      matchingPostsInfo[index].count++
      return
    }

    if (ctx.user?.id !== tagPostRelation.post.createdUserId) {
      matchingPostsInfo.push({ count: 1, post: tagPostRelation.post })
    }
  })

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

export const CreateTagPostRelationsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.list.nonNull.field('createTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagIds: nonNull(list(nonNull(stringArg()))),
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

export const DeleteTagPostRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteTagPostRelation', {
      type: 'TagPostRelation',
      args: {
        tagId: nonNull(stringArg()),
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

export const DeleteTagPostRelationsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.list.nonNull.field('DeleteTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagPostTypes: nonNull(list(nonNull('TagPostInputType'))),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

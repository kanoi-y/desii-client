import { Favorite as FavoriteType, Post } from '@prisma/client'
import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../context'
import { OrderByType } from './Post'

export const Favorite = objectType({
  name: 'Favorite',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('createdUserId')
    t.nonNull.string('postId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('createdUser', {
      type: 'User',
    })
    t.nonNull.field('post', {
      type: 'Post',
    })
  },
})

export const GetFavoritesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetFavorites', {
      type: 'Favorite',
      args: {
        createdUserId: stringArg(),
        postId: stringArg(),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve(_parent, args, ctx) {
        const query: Partial<FavoriteType> = {}
        if (args.createdUserId) query.createdUserId = args.createdUserId
        if (args.postId) query.postId = args.postId

        return ctx.prisma.favorite.findMany({
          where: query,
          orderBy: {
            createdAt: args.sort || 'asc',
          },
          include: {
            createdUser: true,
            post: true,
          },
        })
      },
    })
  },
})

const createNotification = async (ctx: Context, post: Post) => {
  await ctx.prisma.notification.create({
    data: {
      type: 'FETCH_REACTION',
      createdUserId: ctx.user?.id,
      targetUserId: post.createdUserId,
      message: `${ctx.user?.name}さんが「${post.title}」にいいねしました`,
      url: `/post/${post.id}`,
      isChecked: false,
    },
  })
}

export const CreateFavoriteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createFavorite', {
      type: 'Favorite',
      args: {
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

        // バックグラウンドで通知を作成
        createNotification(ctx, post)

        return ctx.prisma.favorite.create({
          data: {
            createdUserId: ctx.user.id,
            postId: args.postId,
          },
          include: {
            createdUser: true,
            post: true,
          },
        })
      },
    })
  },
})

export const DeleteFavoriteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteFavorite', {
      type: 'Favorite',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const favorite = await ctx.prisma.favorite.findUnique({
          where: {
            favoriteId: {
              createdUserId: ctx.user.id,
              postId: args.postId,
            },
          },
        })

        if (!favorite) {
          throw new Error('favoriteが存在しません')
        }

        return ctx.prisma.favorite.delete({
          where: {
            favoriteId: {
              createdUserId: ctx.user.id,
              postId: args.postId,
            },
          },
          include: {
            createdUser: true,
            post: true,
          },
        })
      },
    })
  },
})

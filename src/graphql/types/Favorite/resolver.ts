import { Favorite, Post } from '@prisma/client'
import { Context } from '../../context'

// TODO: prismaをlibからインポートするようにして、引数を修正する。ログインuserは受け取る、argと同じ扱いにする
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

export const getFavoritesResolver = async (
  _parent: {},
  args: {
    createdUserId?: string | null | undefined
    postId?: string | null | undefined
    sort: 'asc' | 'desc' | null
  },
  ctx: Context
) => {
  const query: Partial<Favorite> = {}
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
}

export const createFavoriteResolver = async (
  _parent: {},
  args: {
    postId: string
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

  // バックグラウンドで通知を作成
  if (ctx.user.id !== post.createdUserId) {
    createNotification(ctx, post)
  }

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
}

export const deleteFavoriteResolver = async (
  _parent: {},
  args: {
    postId: string
  },
  ctx: Context
) => {
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
}

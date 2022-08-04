import { Favorite, Post, User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

const createNotification = async (post: Post, user: User) => {
  await prisma.notification.create({
    data: {
      type: 'FETCH_REACTION',
      createdUserId: user?.id,
      targetUserId: post.createdUserId,
      message: `${user?.name}さんが「${post.title}」にいいねしました`,
      url: `/post/${post.id}`,
      isChecked: false,
    },
  })
}

export const getFavoritesResolver = async ({
  sort,
  createdUserId,
  postId,
}: {
  sort: 'asc' | 'desc' | null
  createdUserId?: string | null
  postId?: string | null
}) => {
  const query: Partial<Favorite> = {}
  if (createdUserId) query.createdUserId = createdUserId
  if (postId) query.postId = postId

  return prisma.favorite.findMany({
    where: query,
    orderBy: {
      createdAt: sort || 'asc',
    },
    include: {
      createdUser: true,
      post: true,
    },
  })
}

export const createFavoriteResolver = async ({
  postId,
  user,
}: {
  postId: string
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

  // バックグラウンドで通知を作成
  if (user.id !== post.createdUserId) {
    createNotification(post, user)
  }

  return prisma.favorite.create({
    data: {
      createdUserId: user.id,
      postId,
    },
    include: {
      createdUser: true,
      post: true,
    },
  })
}

export const deleteFavoriteResolver = async ({
  postId,
  user,
}: {
  postId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const favorite = await prisma.favorite.findUnique({
    where: {
      favoriteId: {
        createdUserId: user.id,
        postId,
      },
    },
  })

  if (!favorite) {
    throw new Error('favoriteが存在しません')
  }

  return prisma.favorite.delete({
    where: {
      favoriteId: {
        createdUserId: user.id,
        postId,
      },
    },
    include: {
      createdUser: true,
      post: true,
    },
  })
}

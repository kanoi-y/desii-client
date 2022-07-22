import { Context } from '../../context'

export const getNotificationsResolver = (
  _parent: {},
  args: {
    sort: 'asc' | 'desc' | null
    targetUserId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return ctx.prisma.notification.findMany({
    where: {
      targetUserId: args.targetUserId,
    },
    orderBy: {
      createdAt: args.sort || 'asc',
    },
  })
}

export const updateNotificationResolver = async (
  _parent: {},
  args: {
    id: string
    isChecked: boolean
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const notification = await ctx.prisma.notification.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!notification) {
    throw new Error('更新する通知が存在しません')
  }

  if (notification.targetUserId !== ctx.user.id) {
    throw new Error('ログインユーザーが通知の対象ユーザーではありません')
  }

  return ctx.prisma.notification.update({
    where: {
      id: args.id,
    },
    data: {
      isChecked: args.isChecked,
    },
  })
}

import { User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getNotificationsResolver = ({
  sort,
  targetUserId,
  user,
}: {
  sort: 'asc' | 'desc' | null
  targetUserId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return prisma.notification.findMany({
    where: {
      targetUserId,
    },
    orderBy: {
      createdAt: sort || 'asc',
    },
  })
}

export const updateNotificationResolver = async ({
  id,
  isChecked,
  user,
}: {
  id: string
  isChecked: boolean
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const notification = await prisma.notification.findUnique({
    where: {
      id,
    },
  })

  if (!notification) {
    throw new Error('通知が存在しません')
  }

  if (notification.targetUserId !== user.id) {
    throw new Error('ログインユーザーが通知の対象ユーザーではありません')
  }

  return prisma.notification.update({
    where: {
      id,
    },
    data: {
      isChecked,
    },
  })
}

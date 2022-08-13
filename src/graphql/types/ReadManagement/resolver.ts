import { ReadManagement as ReadManagementType, User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getReadManagementResolver = ({
  messageId,
  targetUserId,
  user,
}: {
  messageId: string
  targetUserId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return prisma.readManagement.findUnique({
    where: {
      ReadManagementId: {
        targetUserId,
        messageId,
      },
    },
  })
}

export const getReadManagementsResolver = ({
  messageId,
  targetUserId,
  user,
}: {
  messageId?: string | null
  targetUserId?: string | null
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }
  const query: Partial<ReadManagementType> = {}
  if (targetUserId) query.targetUserId = targetUserId
  if (messageId) query.messageId = messageId

  return prisma.readManagement.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const updateReadManagementResolver = async ({
  messageId,
  targetUserId,
  user,
}: {
  messageId: string
  targetUserId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const readManagement = await prisma.readManagement.findUnique({
    where: {
      ReadManagementId: {
        targetUserId,
        messageId: messageId,
      },
    },
  })

  if (!readManagement) {
    throw new Error('既読管理が存在しません')
  }

  if (user.id !== targetUserId) {
    throw new Error('自分の既読管理しか更新することは出来ません')
  }

  return prisma.readManagement.update({
    where: {
      ReadManagementId: {
        targetUserId,
        messageId,
      },
    },
    data: {
      isRead: true,
    },
  })
}

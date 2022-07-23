import { ReadManagement as ReadManagementType } from '@prisma/client'
import { Context } from '../../context'

export const getReadManagementResolver = (
  _parent: {},
  args: {
    messageId: string
    targetUserId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return ctx.prisma.readManagement.findUnique({
    where: {
      ReadManagementId: {
        targetUserId: args.targetUserId,
        messageId: args.messageId,
      },
    },
  })
}

export const getReadManagementsResolver = (
  _parent: {},
  args: {
    messageId?: string | null
    targetUserId?: string | null
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }
  const query: Partial<ReadManagementType> = {}
  if (args.targetUserId) query.targetUserId = args.targetUserId
  if (args.messageId) query.messageId = args.messageId

  return ctx.prisma.readManagement.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const updateReadManagementResolver = async (
  _parent: {},
  args: {
    messageId: string
    targetUserId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const readManagement = await ctx.prisma.readManagement.findUnique({
    where: {
      ReadManagementId: {
        targetUserId: args.targetUserId,
        messageId: args.messageId,
      },
    },
  })

  if (!readManagement) {
    throw new Error('既読管理が存在しません')
  }

  if (ctx.user.id !== args.targetUserId) {
    throw new Error('自分の既読管理しか更新することは出来ません')
  }

  return ctx.prisma.readManagement.update({
    where: {
      ReadManagementId: {
        targetUserId: args.targetUserId,
        messageId: args.messageId,
      },
    },
    data: {
      isRead: true,
    },
  })
}

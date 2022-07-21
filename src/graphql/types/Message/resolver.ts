import { RoomMember } from '@prisma/client'
import { Context } from '../../context'

const createReadManagements = async (
  ctx: Context,
  roomMembers: RoomMember[],
  messageId: string
) => {
  await ctx.prisma.readManagement.createMany({
    data: [
      ...roomMembers
        .filter((roomMember: RoomMember) => roomMember.userId !== ctx.user?.id)
        .map((roomMember: RoomMember) => {
          return {
            targetUserId: roomMember.userId,
            messageId,
            isRead: false,
          }
        }),
    ],
  })
}

export const getMessageResolver = (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  return ctx.prisma.message.findUnique({
    where: {
      id: args.id,
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const getMessagesResolver = async (
  _parent: {},
  args: {
    roomId: string
    sort: 'asc' | 'desc' | null
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const roomMembers = await ctx.prisma.roomMember.findMany({
    where: {
      roomId: args.roomId,
    },
  })

  if (
    roomMembers.every((roomMember: RoomMember) => {
      roomMember.userId !== ctx.user?.id
    })
  ) {
    throw new Error(
      'ルームに所属していないユーザーはメッセージを取得できません'
    )
  }

  return ctx.prisma.message.findMany({
    where: {
      roomId: args.roomId,
    },
    orderBy: {
      createdAt: args.sort || 'asc',
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const createMessageResolver = async (
  _parent: {},
  args: {
    body: string
    messageType: 'TEXT' | 'MEDIA' | 'POST'
    roomId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const room = await ctx.prisma.room.findUnique({
    where: {
      id: args.roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  const roomMembers = await ctx.prisma.roomMember.findMany({
    where: {
      roomId: args.roomId,
    },
  })

  if (
    roomMembers.every((roomMember: RoomMember) => {
      roomMember.userId !== ctx.user?.id
    })
  ) {
    throw new Error(
      'ルームに所属していないユーザーはメッセージを作成できません'
    )
  }

  const message = await ctx.prisma.message.create({
    data: {
      type: args.messageType,
      roomId: args.roomId,
      userId: ctx.user.id,
      body: args.body,
    },
    include: {
      user: true,
      room: true,
    },
  })

  createReadManagements(ctx, roomMembers, message.id)

  await ctx.prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      latestMessageId: message.id,
    },
  })

  return message
}

export const deleteMessageResolver = async (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const message = await ctx.prisma.message.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!message) {
    throw new Error('メッセージが存在しません')
  }

  if (ctx.user.id !== message.userId) {
    throw new Error('メッセージの作成者しか削除することは出来ません')
  }

  return ctx.prisma.message.delete({
    where: {
      id: args.id,
    },
    include: {
      user: true,
      room: true,
    },
  })
}

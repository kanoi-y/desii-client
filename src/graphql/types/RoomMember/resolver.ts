import { RoomMember as RoomMemberType } from '@prisma/client'
import { Context } from '../../context'

export const getTargetRoomMemberResolver = async (
  _parent: {},
  args: {
    roomId: string
    userId: string
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

  const group = await ctx.prisma.group.findUnique({
    where: {
      roomId: args.roomId,
    },
  })

  if (group) {
    throw new Error('ルームが一対一のルームではありません')
  }

  return ctx.prisma.roomMember.findFirst({
    where: {
      roomId: args.roomId,
      NOT: {
        userId: args.userId,
      },
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const getRoomMembersResolver = (
  _parent: {},
  args: {
    roomId?: string | null
    userId?: string | null
  },
  ctx: Context
) => {
  const query: Partial<RoomMemberType> = {}
  if (args.userId) query.userId = args.userId
  if (args.roomId) query.roomId = args.roomId

  return ctx.prisma.roomMember.findMany({
    where: query,
    include: {
      user: true,
      room: true,
    },
  })
}

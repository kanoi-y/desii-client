import { RoomMember as RoomMemberType, User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getTargetRoomMemberResolver = async ({
  roomId,
  userId,
  user,
}: {
  roomId: string
  userId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  const group = await prisma.group.findUnique({
    where: {
      roomId,
    },
  })

  if (group) {
    throw new Error('ルームが一対一のルームではありません')
  }

  return prisma.roomMember.findFirst({
    where: {
      roomId,
      NOT: {
        userId,
      },
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const getRoomMembersResolver = ({
  roomId,
  userId,
}: {
  roomId?: string | null
  userId?: string | null
}) => {
  const query: Partial<RoomMemberType> = {}
  if (userId) query.userId = userId
  if (roomId) query.roomId = roomId

  return prisma.roomMember.findMany({
    where: query,
    include: {
      user: true,
      room: true,
    },
  })
}

import { RoomMember, User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

const createReadManagements = async (
  roomMembers: RoomMember[],
  messageId: string,
  userId: string
) => {
  await prisma.readManagement.createMany({
    data: [
      ...roomMembers
        .filter((roomMember: RoomMember) => roomMember.userId !== userId)
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

export const getMessageResolver = ({ id }: { id: string }) => {
  return prisma.message.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const getMessagesResolver = async ({
  roomId,
  sort,
  user,
}: {
  roomId: string
  sort: 'asc' | 'desc' | null
  user: User
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const roomMembers = await prisma.roomMember.findMany({
    where: {
      roomId,
    },
  })

  if (
    roomMembers.every((roomMember: RoomMember) => {
      roomMember.userId !== user?.id
    })
  ) {
    throw new Error(
      'ルームに所属していないユーザーはメッセージを取得できません'
    )
  }

  return prisma.message.findMany({
    where: {
      roomId,
    },
    orderBy: {
      createdAt: sort || 'asc',
    },
    include: {
      user: true,
      room: true,
    },
  })
}

export const createMessageResolver = async ({
  body,
  messageType,
  roomId,
  user,
}: {
  body: string
  messageType: 'TEXT' | 'MEDIA' | 'POST'
  roomId: string
  user: User
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

  const roomMembers = await prisma.roomMember.findMany({
    where: {
      roomId,
    },
  })

  if (
    roomMembers.every((roomMember: RoomMember) => {
      roomMember.userId !== user?.id
    })
  ) {
    throw new Error(
      'ルームに所属していないユーザーはメッセージを作成できません'
    )
  }

  const message = await prisma.message.create({
    data: {
      type: messageType,
      roomId,
      userId: user.id,
      body,
    },
    include: {
      user: true,
      room: true,
    },
  })

  createReadManagements(roomMembers, message.id, user.id)

  await prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      latestMessageId: message.id,
    },
  })

  return message
}

export const deleteMessageResolver = async ({
  id,
  user,
}: {
  id: string
  user: User
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  })

  if (!message) {
    throw new Error('メッセージが存在しません')
  }

  if (user.id !== message.userId) {
    throw new Error('メッセージの作成者しか削除することは出来ません')
  }

  return prisma.message.delete({
    where: {
      id,
    },
    include: {
      user: true,
      room: true,
    },
  })
}

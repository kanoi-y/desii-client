import { Group, Room as RoomType, RoomMember, User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getRoomResolver = ({ id }: { id: string }) => {
  return prisma.room.findUnique({
    where: {
      id,
    },
  })
}

export const getOneOnOneRoomResolver = async ({
  memberId,
  user,
}: {
  memberId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const roomMembers: (RoomMember & {
    room: RoomType
  })[] = await prisma.roomMember.findMany({
    where: {
      OR: [
        {
          userId: memberId,
        },
        {
          userId: user.id,
        },
      ],
    },
    include: {
      room: true,
    },
  })

  const roomIdRelatedByGroup = (
    await prisma.group.findMany({
      where: {
        OR: roomMembers.map(
          (
            roomMember: RoomMember & {
              room: RoomType
            }
          ) => {
            return {
              roomId: roomMember.roomId,
            }
          }
        ),
      },
    })
  ).map((group: Group) => group.roomId)

  return (
    roomMembers.find(
      (
        roomMember: RoomMember & {
          room: RoomType
        },
        index,
        self
      ) => {
        const selfIndex = self.findIndex(
          (
            dataElement: RoomMember & {
              room: RoomType
            }
          ) => dataElement.roomId === roomMember.roomId
        )
        return (
          selfIndex !== index &&
          !roomIdRelatedByGroup.includes(roomMember.roomId)
        )
      }
    )?.room || null
  )
}

export const getRoomsByLoginUserIdResolver = async ({
  getRoomType,
  user,
}: {
  getRoomType: 'ALL' | 'ONLY_ONE_ON_ONE' | 'ONLY_GROUP'
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const roomMembers = await prisma.roomMember.findMany({
    where: {
      userId: user.id,
    },
    include: {
      room: true,
    },
  })

  const roomIdRelatedByGroup = (
    await prisma.group.findMany({
      where: {
        OR: roomMembers.map(
          (
            roomMember: RoomMember & {
              room: RoomType
            }
          ) => {
            return {
              roomId: roomMember.roomId,
            }
          }
        ),
      },
    })
  ).map((group: Group) => group.roomId)

  return roomMembers
    .map(
      (
        roomMember: RoomMember & {
          room: RoomType
        }
      ) => {
        return roomMember.room
      }
    )
    .filter((room: RoomType) => {
      if (getRoomType === 'ONLY_ONE_ON_ONE') {
        return !roomIdRelatedByGroup.includes(room.id)
      }
      if (getRoomType === 'ONLY_GROUP') {
        return roomIdRelatedByGroup.includes(room.id)
      }
      return true
    })
    .sort((a: RoomType, b: RoomType) => {
      return a.updatedAt < b.updatedAt ? 1 : -1
    })
}

export const createRoomResolver = async ({
  memberId,
  user,
}: {
  memberId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  if (user.id === memberId) {
    throw new Error('自分とのルームは作成できません')
  }

  const room = await prisma.room.create({
    data: {},
  })

  await prisma.roomMember.createMany({
    data: [
      {
        roomId: room.id,
        userId: user.id,
      },
      {
        roomId: room.id,
        userId: memberId,
      },
    ],
  })

  return room
}

export const deleteRoomResolver = async ({
  id,
  user,
}: {
  id: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  const group = await prisma.group.findUnique({
    where: {
      roomId: room.id,
    },
  })

  if (group) {
    throw new Error(
      'グループに紐づいているルームはルームだけ削除することは出来ません'
    )
  }

  const roomMembers = await prisma.roomMember.findMany({
    where: {
      roomId: room.id,
    },
  })

  if (
    roomMembers.every((roomMember: RoomMember) => {
      roomMember.userId !== user?.id
    })
  ) {
    throw new Error('メンバーしかルームを削除することは出来ません')
  }

  return prisma.room.delete({
    where: {
      id,
    },
  })
}

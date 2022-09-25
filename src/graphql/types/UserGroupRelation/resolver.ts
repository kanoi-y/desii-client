import {
  User,
  UserGroupRelation as UserGroupRelationType,
} from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const createRoomMember = async (roomId: string, userId: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  await prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: userId,
    },
  })
}

export const deleteRoomMember = async (roomId: string, userId: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  await prisma.roomMember.delete({
    where: {
      RoomMemberId: {
        roomId: room.id,
        userId,
      },
    },
  })
}

export const getUserGroupRelationsResolver = ({
  groupId,
  userId,
}: {
  groupId?: string | null
  userId?: string | null
}) => {
  const query: Partial<UserGroupRelationType> = {}
  if (userId) query.userId = userId
  if (groupId) query.groupId = groupId

  return prisma.userGroupRelation.findMany({
    where: query,
    include: {
      user: true,
      group: true,
    },
  })
}

export const createUserGroupRelationResolver = async ({
  groupId,
  userId,
  user,
}: {
  groupId: string
  userId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const userById = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  })

  if (!userById || !group) {
    throw new Error('ユーザー、またはグループが存在しません')
  }

  if (user.id !== group.adminUserId) {
    throw new Error('管理者ユーザーしかユーザーを追加できません')
  }

  createRoomMember(group.roomId, userId)

  return prisma.userGroupRelation.create({
    data: {
      userId,
      groupId,
    },
    include: {
      user: true,
      group: true,
    },
  })
}

export const DeleteUserGroupRelationResolver = async ({
  groupId,
  userId,
  user,
}: {
  groupId: string
  userId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const userGroupRelation = await prisma.userGroupRelation.findUnique({
    where: {
      relationId: {
        userId,
        groupId,
      },
    },
    include: {
      group: true,
    },
  })

  if (!userGroupRelation) {
    throw new Error('userGroupRelationが存在しません')
  }

  const group = userGroupRelation.group

  if (user.id !== userGroupRelation.userId && user.id !== group.adminUserId) {
    throw new Error(
      '管理者ユーザー以外は、自分以外のユーザーを削除することは出来ません'
    )
  }

  if (userGroupRelation.userId === group.adminUserId) {
    throw new Error('グループからグループの管理者を削除することは出来ません')
  }

  deleteRoomMember(group.roomId, userId)
  return prisma.userGroupRelation.delete({
    where: {
      relationId: {
        userId,
        groupId,
      },
    },
    include: {
      user: true,
      group: true,
    },
  })
}

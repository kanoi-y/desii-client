import { User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getGroupResolver = ({ id }: { id: string }) => {
  return prisma.group.findUnique({
    where: {
      id,
    },
  })
}

export const getGroupByRoomIdResolver = ({ roomId }: { roomId: string }) => {
  return prisma.group.findUnique({
    where: {
      roomId,
    },
  })
}

export const getGroupByProductIdResolver = ({
  productId,
}: {
  productId: string
}) => {
  return prisma.group.findUnique({
    where: {
      productId,
    },
  })
}

export const createGroupResolver = async ({
  description,
  image,
  name,
  productId,
  user,
}: {
  description?: string | null
  image: string
  name: string
  productId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  // groupを作成する際に、room,roomMemberも作成する
  const room = await prisma.room.create({
    data: {},
  })

  await prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: user.id,
    },
  })

  const group = await prisma.group.create({
    data: {
      name,
      description,
      image,
      productId,
      adminUserId: user.id,
      roomId: room.id,
    },
  })

  await prisma.userGroupRelation.create({
    data: {
      userId: user.id,
      groupId: group.id,
    },
  })

  return group
}

export const deleteGroupResolver = async ({
  id,
  user,
}: {
  id: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  })

  if (!group) {
    throw new Error('グループが存在しません')
  }

  if (user.id !== group.adminUserId) {
    throw new Error('ユーザーがチームの管理者ではありません')
  }

  await prisma.group.delete({
    where: {
      id,
    },
  })

  await prisma.room.delete({
    where: {
      id: group.roomId,
    },
  })

  return group
}

export const updateGroupResolver = async ({
  id,
  adminUserId,
  description,
  image,
  name,
  user,
}: {
  id: string
  adminUserId?: string | null
  description?: string | null
  image?: string | null
  name?: string | null
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  })

  if (!group) {
    throw new Error('グループが存在しません')
  }

  if (user.id !== group.adminUserId) {
    throw new Error('ユーザーがチームの管理者ではありません')
  }

  const updateGroup = {
    name: name || group.name,
    description: description || group.description,
    image: image || group.image,
    adminUserId: adminUserId || group.adminUserId,
  }

  return prisma.group.update({
    where: {
      id,
    },
    data: updateGroup,
  })
}

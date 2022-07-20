import { Context } from '../../context'

export const getGroupResolver = (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  return ctx.prisma.group.findUnique({
    where: {
      id: args.id,
    },
  })
}

export const getGroupByRoomIdResolver = (
  _parent: {},
  args: {
    roomId: string
  },
  ctx: Context
) => {
  return ctx.prisma.group.findUnique({
    where: {
      roomId: args.roomId,
    },
  })
}

export const getGroupByProductIdResolver = (
  _parent: {},
  args: {
    productId: string
  },
  ctx: Context
) => {
  return ctx.prisma.group.findUnique({
    where: {
      productId: args.productId,
    },
  })
}

export const createGroupResolver = async (
  _parent: {},
  args: {
    description?: string | null | undefined
    image: string
    name: string
    productId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  // groupを作成する際に、room,roomMemberも作成する
  const room = await ctx.prisma.room.create({
    data: {},
  })

  await ctx.prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: ctx.user.id,
    },
  })

  const group = await ctx.prisma.group.create({
    data: {
      name: args.name,
      description: args.description,
      image: args.image,
      productId: args.productId,
      adminUserId: ctx.user.id,
      roomId: room.id,
    },
  })

  await ctx.prisma.userGroupRelation.create({
    data: {
      userId: ctx.user.id,
      groupId: group.id,
    },
  })

  return group
}

export const deleteGroupResolver = async (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const group = await ctx.prisma.group.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!group) {
    throw new Error('グループが存在しません')
  }

  if (ctx.user.id !== group.adminUserId) {
    throw new Error('ユーザーがチームの管理者ではありません')
  }

  await ctx.prisma.group.delete({
    where: {
      id: args.id,
    },
  })

  await ctx.prisma.room.delete({
    where: {
      id: group.roomId,
    },
  })

  return group
}

export const updateGroupResolver = async (
  _parent: {},
  args: {
    id: string
    adminUserId?: string | null | undefined
    description?: string | null | undefined
    image?: string | null | undefined
    name?: string | null | undefined
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const group = await ctx.prisma.group.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!group) {
    throw new Error('グループが存在しません')
  }

  if (ctx.user.id !== group.adminUserId) {
    throw new Error('ユーザーがチームの管理者ではありません')
  }

  const updateGroup = {
    name: args.name || group.name,
    description: args.description || group.description,
    image: args.image || group.image,
    adminUserId: args.adminUserId || group.adminUserId,
  }

  return ctx.prisma.group.update({
    where: {
      id: args.id,
    },
    data: updateGroup,
  })
}

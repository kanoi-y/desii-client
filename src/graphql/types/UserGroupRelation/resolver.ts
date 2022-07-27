import { UserGroupRelation as UserGroupRelationType } from '@prisma/client'
import { Context } from '../../context'

const createRoomMember = async (
  ctx: Context,
  roomId: string,
  userId: string
) => {
  const room = await ctx.prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  await ctx.prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: userId,
    },
  })
}

const deleteRoomMember = async (
  ctx: Context,
  roomId: string,
  userId: string
) => {
  const room = await ctx.prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!room) {
    throw new Error('ルームが存在しません')
  }

  await ctx.prisma.roomMember.delete({
    where: {
      RoomMemberId: {
        roomId: room.id,
        userId,
      },
    },
  })
}

export const getUserGroupRelationsResolver = (
  _parent: {},
  args: {
    groupId?: string | null
    userId?: string | null
  },
  ctx: Context
) => {
  const query: Partial<UserGroupRelationType> = {}
  if (args.userId) query.userId = args.userId
  if (args.groupId) query.groupId = args.groupId

  return ctx.prisma.userGroupRelation.findMany({
    where: query,
    include: {
      user: true,
      group: true,
    },
  })
}

export const createUserGroupRelationResolver = async (
  _parent: {},
  args: {
    groupId: string
    userId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: args.userId,
    },
  })

  const group = await ctx.prisma.group.findUnique({
    where: {
      id: args.groupId,
    },
  })

  if (!user || !group) {
    throw new Error('ユーザー、またはグループが存在しません')
  }

  if (ctx.user.id !== group.adminUserId) {
    throw new Error('管理者ユーザーしかユーザーを追加できません')
  }

  createRoomMember(ctx, group.roomId, args.userId)

  return ctx.prisma.userGroupRelation.create({
    data: {
      userId: args.userId,
      groupId: args.groupId,
    },
    include: {
      user: true,
      group: true,
    },
  })
}

export const DeleteUserGroupRelationResolver = async (
  _parent: {},
  args: {
    groupId: string
    userId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const userGroupRelation = await ctx.prisma.userGroupRelation.findUnique({
    where: {
      relationId: {
        userId: args.userId,
        groupId: args.groupId,
      },
    },
  })

  if (!userGroupRelation) {
    throw new Error('userGroupRelationが存在しません')
  }

  const group = await ctx.prisma.group.findUnique({
    where: {
      id: userGroupRelation.groupId,
    },
  })

  if (!group) {
    throw new Error('グループが存在しません')
  }

  if (
    ctx.user.id !== userGroupRelation.userId &&
    ctx.user.id !== group.adminUserId
  ) {
    throw new Error(
      '管理者ユーザー以外は、自分以外のユーザーを削除することは出来ません'
    )
  }

  if (userGroupRelation.userId === group.adminUserId) {
    throw new Error('グループからグループの管理者を削除することは出来ません')
  }

  deleteRoomMember(ctx, group.roomId, args.userId)
  return ctx.prisma.userGroupRelation.delete({
    where: {
      relationId: {
        userId: args.userId,
        groupId: args.groupId,
      },
    },
    include: {
      user: true,
      group: true,
    },
  })
}

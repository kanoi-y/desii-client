import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../context'

// TODO: roomIdを追加
export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.string('image')
    t.nonNull.string('adminUserId')
    t.nonNull.string('productId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.group.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

const createRoom = async (ctx: Context, groupId: string, userId: string) => {
  const room = await ctx.prisma.room.create({
    data: {
      groupId,
    },
  })

  await ctx.prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: userId,
    },
  })
}

export const CreateGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createGroup', {
      type: 'Group',
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        image: nonNull(stringArg()),
        productId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const group = await ctx.prisma.group.create({
          data: {
            name: args.name,
            description: args.description,
            image: args.image,
            productId: args.productId,
            adminUserId: ctx.user.id,
          },
        })

        await ctx.prisma.userGroupRelation.create({
          data: {
            userId: ctx.user.id,
            groupId: group.id,
          },
        })

        createRoom(ctx, group.id, ctx.user.id)

        return group
      },
    })
  },
})

const deleteRoom = async (ctx: Context, groupId: string) => {
  await ctx.prisma.room.delete({
    where: {
      groupId,
    },
  })
}

export const DeleteGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
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

        deleteRoom(ctx, group.id)
        return ctx.prisma.group.delete({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

export const UpdateGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
        image: stringArg(),
        adminUserId: stringArg(),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

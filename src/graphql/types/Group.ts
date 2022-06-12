import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.string('image')
    t.nonNull.string('adminUserId')
    t.nonNull.string('productId')
    t.nonNull.string('roomId')
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

export const GetGroupByRoomIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGroupByRoomId', {
      type: 'Group',
      args: {
        roomId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.group.findUnique({
          where: {
            roomId: args.roomId,
          },
        })
      },
    })
  },
})

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
      },
    })
  },
})

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

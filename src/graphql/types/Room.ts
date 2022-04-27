import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.nonNull.string('id')
    t.string('groupId')
    t.string('latestMessageId')
    t.field('latestMessage', {
      type: 'Message',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetRoom', {
      type: 'Room',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.room.findUnique({
          where: {
            id: args.id,
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

// 一対一のルームを作成する
export const CreateRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('CreateRoom', {
      type: 'Room',
      args: {
        memberId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        if (ctx.user.id === args.memberId) {
          throw new Error('自分とのルームは作成できません')
        }

        const room = await ctx.prisma.room.create({
          data: {},
        })

        await ctx.prisma.roomMember.createMany({
          data: [
            {
              roomId: room.id,
              userId: ctx.user.id,
            },
            {
              roomId: room.id,
              userId: args.memberId,
            },
          ],
        })

        return room
      },
    })
  },
})

export const DeleteRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteRoom', {
      type: 'Room',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const Room = await ctx.prisma.room.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!Room) {
          throw new Error('ルームが存在しません')
        }

        // TODO: memberしかルームを削除できないようにする
        return ctx.prisma.room.delete({
          where: {
            id: args.id,
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

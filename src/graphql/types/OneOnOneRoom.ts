import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'
import { OrderByType } from './Post'

export const OneOnOneRoom = objectType({
  name: 'OneOnOneRoom',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('memberId1')
    t.nonNull.string('memberId2')
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

export const GetOneOnOneRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetOneOnOneRooms', {
      type: 'OneOnOneRoom',
      args: {
        targetMemberId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        return ctx.prisma.oneOnOneRoom.findMany({
          where: {
            OR: [
              {
                memberId1: args.targetMemberId,
              },
              {
                memberId2: args.targetMemberId,
              },
            ],
          },
          orderBy: {
            createdAt: args.sort || 'asc',
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

export const CreateOneOnOneRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('CreateOneOnOneRoom', {
      type: 'OneOnOneRoom',
      args: {
        memberId1: nonNull(stringArg()),
        memberId2: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        if (args.memberId1 === args.memberId2) {
          throw new Error('自分だけのルームを作成することは出来ません')
        }

        if (ctx.user.id !== args.memberId1 && ctx.user.id !== args.memberId2) {
          throw new Error(
            'メンバーではないユーザーはルームを作成することは出来ません'
          )
        }

        const oneOnOneRoom = await ctx.prisma.oneOnOneRoom.findFirst({
          where: {
            OR: [
              {
                AND: [
                  { memberId1: args.memberId1 },
                  { memberId2: args.memberId2 },
                ],
              },
              {
                AND: [
                  { memberId2: args.memberId1 },
                  { memberId1: args.memberId2 },
                ],
              },
            ],
          },
        })

        if (oneOnOneRoom) {
          throw new Error('同じメンバーのルームが存在しています')
        }

        return ctx.prisma.oneOnOneRoom.create({
          data: {
            memberId1: args.memberId1,
            memberId2: args.memberId2,
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

export const DeleteOneOnOneRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteOneOnOneRoom', {
      type: 'OneOnOneRoom',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const oneOnOneRoom = await ctx.prisma.oneOnOneRoom.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!oneOnOneRoom) {
          throw new Error('ルームが存在しません')
        }

        if (
          ctx.user.id !== oneOnOneRoom.memberId1 &&
          ctx.user.id !== oneOnOneRoom.memberId2
        ) {
          throw new Error('メンバーしかルームを削除することは出来ません')
        }
        return ctx.prisma.oneOnOneRoom.delete({
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

import { RoomMember as RoomMemberType } from '@prisma/client'
import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const RoomMember = objectType({
  name: 'RoomMember',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('roomId')
    t.nonNull.string('userId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('room', {
      type: 'Room',
    })
    t.nonNull.field('user', {
      type: 'User',
    })
  },
})

// 一対一ルームの相手のroomMemberを取得する
export const GetTargetRoomMemberQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getTargetRoomMember', {
      type: 'RoomMember',
      args: {
        roomId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const room = await ctx.prisma.room.findUnique({
          where: {
            id: args.roomId,
          },
          include: {
            group: true,
          },
        })

        if (!room) {
          throw new Error('ルームが存在しません')
        }

        if (room.group) {
          throw new Error('ルームが一対一のルームではありません')
        }

        return ctx.prisma.roomMember.findFirst({
          where: {
            roomId: args.roomId,
            NOT: {
              userId: args.userId,
            },
          },
          include: {
            user: true,
            room: true,
          },
        })
      },
    })
  },
})

export const GetRoomMembersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getRoomMembers', {
      type: 'RoomMember',
      args: {
        userId: stringArg(),
        roomId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        const query: Partial<RoomMemberType> = {}
        if (args.userId) query.userId = args.userId
        if (args.roomId) query.roomId = args.roomId

        return ctx.prisma.roomMember.findMany({
          where: query,
          include: {
            user: true,
            room: true,
          },
        })
      },
    })
  },
})

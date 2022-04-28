import { RoomMember as RoomMemberType } from '@prisma/client'
import { extendType, objectType, stringArg } from 'nexus'

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

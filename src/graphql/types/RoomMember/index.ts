import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { getRoomMembersResolver, getTargetRoomMemberResolver } from './resolver'

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
      resolve: getTargetRoomMemberResolver,
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
      resolve: getRoomMembersResolver,
    })
  },
})

import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus'
import {
  createRoomResolver,
  deleteRoomResolver,
  getOneOnOneRoomResolver,
  getRoomResolver,
  getRoomsByLoginUserIdResolver,
} from './resolver'

export const GetRoomType = enumType({
  name: 'GetRoomType',
  members: ['ALL', 'ONLY_ONE_ON_ONE', 'ONLY_GROUP'],
})

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.nonNull.string('id')
    t.string('latestMessageId')
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
      resolve: getRoomResolver,
    })
  },
})

export const GetOneOnOneRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetOneOnOneRoom', {
      type: 'Room',
      args: {
        memberId: nonNull(stringArg()),
      },
      resolve: getOneOnOneRoomResolver,
    })
  },
})

export const GetRoomsByLoginUserIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetRoomsByLoginUserId', {
      type: 'Room',
      args: {
        getRoomType: nonNull(GetRoomType),
      },
      resolve: getRoomsByLoginUserIdResolver,
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
      resolve: createRoomResolver,
    })
  },
})

// 一対一ルームを削除する
export const DeleteRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteRoom', {
      type: 'Room',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: deleteRoomResolver,
    })
  },
})

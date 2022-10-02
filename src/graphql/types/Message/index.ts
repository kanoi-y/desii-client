import {
  arg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { OrderByType } from '../Post'
import {
  createMessageResolver,
  deleteMessageResolver,
  getMessageResolver,
  getMessagesResolver,
} from './resolver'

export const MessageType = enumType({
  name: 'MessageType',
  members: ['TEXT', 'MEDIA', 'POST'],
})

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('type', {
      type: 'MessageType',
    })
    t.nonNull.string('roomId')
    t.nonNull.string('userId')
    t.nonNull.string('body')
    t.nonNull.field('user', {
      type: 'User',
    })
    t.nonNull.field('room', {
      type: 'Room',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetMessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getMessage', {
      type: 'Message',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getMessageResolver({
          id: args.id,
        })
      },
    })
  },
})

export const GetMessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetMessages', {
      type: 'Message',
      args: {
        roomId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve(_parent, args, ctx) {
        return getMessagesResolver({
          roomId: args.roomId,
          sort: args.sort,
          user: ctx.user,
        })
      },
    })
  },
})

export const CreateMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('CreateMessage', {
      type: 'Message',
      args: {
        messageType: nonNull(
          arg({
            type: MessageType,
          })
        ),
        roomId: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return createMessageResolver({
          body: args.body,
          messageType: args.messageType,
          roomId: args.roomId,
          user: ctx.user,
        })
      },
    })
  },
})

export const DeleteMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteMessage', {
      type: 'Message',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return deleteMessageResolver({
          id: args.id,
          user: ctx.user,
        })
      },
    })
  },
})

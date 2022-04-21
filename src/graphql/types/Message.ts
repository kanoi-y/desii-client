import {
  arg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { OrderByType } from './Post'

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
    t.nonNull.string('targetId')
    t.nonNull.string('userId')
    t.nonNull.string('body')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetMessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetMessages', {
      type: 'Message',
      args: {
        targetId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const oneOnOneRoom = await ctx.prisma.oneOnOneRoom.findUnique({
          where: {
            id: args.targetId,
          },
        })

        const userGroupRelations = await ctx.prisma.userGroupRelation.findMany({
          where: {
            groupId: args.targetId,
          },
        })

        if (
          oneOnOneRoom?.memberId1 !== ctx.user.id &&
          oneOnOneRoom?.memberId2 !== ctx.user.id &&
          userGroupRelations.every(
            (userGroupRelation) =>
              ctx.user && userGroupRelation.userId !== ctx.user.id
          )
        ) {
          throw new Error('所属していないルームのメッセージは閲覧できません')
        }

        return ctx.prisma.message.findMany({
          where: {
            targetId: args.targetId,
          },
          orderBy: {
            createdAt: args.sort || 'asc',
          },
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
        targetId: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const oneOnOneRoom = await ctx.prisma.oneOnOneRoom.findUnique({
          where: {
            id: args.targetId,
          },
        })

        const userGroupRelations = await ctx.prisma.userGroupRelation.findMany({
          where: {
            groupId: args.targetId,
          },
        })

        if (
          oneOnOneRoom?.memberId1 !== ctx.user.id &&
          oneOnOneRoom?.memberId2 !== ctx.user.id &&
          userGroupRelations.every(
            (userGroupRelation) =>
              ctx.user && userGroupRelation.userId !== ctx.user.id
          )
        ) {
          throw new Error('所属していないルームのメッセージは作成できません')
        }

        return ctx.prisma.message.create({
          data: {
            type: args.messageType,
            targetId: args.targetId,
            userId: ctx.user.id,
            body: args.body,
          },
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
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const message = await ctx.prisma.message.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!message) {
          throw new Error('メッセージが存在しません')
        }

        if (ctx.user.id !== message.userId) {
          throw new Error('メッセージの作成者しか削除することは出来ません')
        }

        return ctx.prisma.message.delete({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

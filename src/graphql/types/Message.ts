import { RoomMember } from '@prisma/client'
import {
  arg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Context } from '../context'
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
    t.nonNull.string('roomId')
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
        roomId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const roomMembers = await ctx.prisma.roomMember.findMany({
          where: {
            roomId: args.roomId,
          },
        })

        if (
          roomMembers.every((roomMember: RoomMember) => {
            roomMember.userId !== ctx.user?.id
          })
        ) {
          throw new Error(
            'ルームに所属していないユーザーはメッセージを取得できません'
          )
        }

        return ctx.prisma.message.findMany({
          where: {
            roomId: args.roomId,
          },
          orderBy: {
            createdAt: args.sort || 'asc',
          },
        })
      },
    })
  },
})

const createReadManagements = async (
  ctx: Context,
  roomMembers: RoomMember[],
  messageId: string
) => {
  await ctx.prisma.readManagement.createMany({
    data: [
      ...roomMembers
        .filter((roomMember: RoomMember) => roomMember.userId !== ctx.user?.id)
        .map((roomMember: RoomMember) => {
          return {
            targetUserId: roomMember.userId,
            messageId,
            isRead: false,
          }
        }),
    ],
  })
}

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
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const room = await ctx.prisma.room.findUnique({
          where: {
            id: args.roomId,
          },
        })

        if (!room) {
          throw new Error('ルームが存在しません')
        }

        const roomMembers = await ctx.prisma.roomMember.findMany({
          where: {
            roomId: args.roomId,
          },
        })

        if (
          roomMembers.every((roomMember: RoomMember) => {
            roomMember.userId !== ctx.user?.id
          })
        ) {
          throw new Error(
            'ルームに所属していないユーザーはメッセージを作成できません'
          )
        }

        const message = await ctx.prisma.message.create({
          data: {
            type: args.messageType,
            roomId: args.roomId,
            userId: ctx.user.id,
            body: args.body,
          },
        })

        createReadManagements(ctx, roomMembers, message.id)

        await ctx.prisma.room.update({
          where: {
            id: room.id,
          },
          data: {
            latestMessageId: message.id,
          },
        })

        return message
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

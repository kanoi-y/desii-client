import { ReadManagement as ReadManagementType } from '@prisma/client'
import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const ReadManagement = objectType({
  name: 'ReadManagement',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('targetUserId')
    t.nonNull.string('messageId')
    t.nonNull.boolean('isRead')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetReadManagementQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetReadManagement', {
      type: 'ReadManagement',
      args: {
        targetUserId: nonNull(stringArg()),
        messageId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        return ctx.prisma.readManagement.findUnique({
          where: {
            ReadManagementId: {
              targetUserId: args.targetUserId,
              messageId: args.messageId,
            },
          },
        })
      },
    })
  },
})

export const GetReadManagementsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetReadManagements', {
      type: 'ReadManagement',
      args: {
        messageId: stringArg(),
        targetUserId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }
        const query: Partial<ReadManagementType> = {}
        if (args.targetUserId) query.targetUserId = args.targetUserId
        if (args.messageId) query.messageId = args.messageId

        return ctx.prisma.readManagement.findMany({
          where: query,
          orderBy: {
            createdAt: 'desc',
          },
        })
      },
    })
  },
})

export const UpdateReadManagementMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('UpdateReadManagement', {
      type: 'ReadManagement',
      args: {
        targetUserId: nonNull(stringArg()),
        messageId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const readManagement = await ctx.prisma.readManagement.findUnique({
          where: {
            ReadManagementId: {
              targetUserId: args.targetUserId,
              messageId: args.messageId,
            },
          },
        })

        if (!readManagement) {
          throw new Error('既読管理が存在しません')
        }

        if (ctx.user.id !== args.targetUserId) {
          throw new Error('自分の既読管理しか更新することは出来ません')
        }

        return ctx.prisma.readManagement.update({
          where: {
            ReadManagementId: {
              targetUserId: args.targetUserId,
              messageId: args.messageId,
            },
          },
          data: {
            isRead: true,
          },
        })
      },
    })
  },
})

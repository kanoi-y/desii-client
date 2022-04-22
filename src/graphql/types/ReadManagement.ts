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

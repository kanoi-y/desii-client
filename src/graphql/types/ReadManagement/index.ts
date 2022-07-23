import { extendType, nonNull, objectType, stringArg } from 'nexus'
import {
  getReadManagementResolver,
  getReadManagementsResolver,
  updateReadManagementResolver,
} from './resolver'

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
      resolve: getReadManagementResolver,
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
      resolve: getReadManagementsResolver,
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
      resolve: updateReadManagementResolver,
    })
  },
})

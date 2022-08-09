import {
  arg,
  booleanArg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { OrderByType } from '../Post'
import {
  getNotificationsResolver,
  updateNotificationResolver,
} from './resolver'

export const NotificationType = enumType({
  name: 'NotificationType',
  members: ['FETCH_REACTION', 'MATCH_POST'],
})

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('type', {
      type: 'NotificationType',
    })
    t.string('createdUserId')
    t.nonNull.string('targetUserId')
    t.nonNull.string('message')
    t.nonNull.string('url')
    t.nonNull.boolean('isChecked')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetNotificationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetNotifications', {
      type: 'Notification',
      args: {
        targetUserId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve(_parent, args, ctx) {
        return getNotificationsResolver({
          sort: args.sort,
          targetUserId: args.targetUserId,
          user: ctx.user,
        })
      },
    })
  },
})

export const UpdateNotificationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('UpdateNotification', {
      type: 'Notification',
      args: {
        id: nonNull(stringArg()),
        isChecked: nonNull(booleanArg()),
      },
      resolve(_parent, args, ctx) {
        return updateNotificationResolver({
          id: args.id,
          isChecked: args.isChecked,
          user: ctx.user,
        })
      },
    })
  },
})

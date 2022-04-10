import {
  arg,
  booleanArg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { OrderByType } from './Post'

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
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        return ctx.prisma.notification.findMany({
          where: {
            targetUserId: args.targetUserId,
          },
          orderBy: {
            createdAt: args.sort || 'asc',
          },
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
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const notification = await ctx.prisma.notification.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!notification) {
          throw new Error('更新する通知が存在しません')
        }

        if (notification.targetUserId !== ctx.user.id) {
          throw new Error('ログインユーザーが通知の対象ユーザーではありません')
        }

        return ctx.prisma.notification.update({
          where: {
            id: args.id,
          },
          data: {
            isChecked: args.isChecked,
          },
        })
      },
    })
  },
})

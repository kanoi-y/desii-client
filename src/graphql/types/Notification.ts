import { enumType, objectType } from 'nexus'

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

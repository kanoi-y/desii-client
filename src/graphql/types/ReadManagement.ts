import { objectType } from 'nexus'

export const ReadManagement = objectType({
  name: 'ReadManagement',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('targetUserId')
    t.nonNull.string('MessageId')
    t.nonNull.boolean('isRead')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

import { objectType } from 'nexus'

export const OneOnOneRoom = objectType({
  name: 'OneOnOneRoom',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('memberId1')
    t.nonNull.string('memberId2')
    t.nonNull.string('latestMessage')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

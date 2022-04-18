import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'
import { OrderByType } from './Post'

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

export const GetOneOnOneRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetOneOnOneRooms', {
      type: 'OneOnOneRoom',
      args: {
        targetMemberId: nonNull(stringArg()),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        return ctx.prisma.oneOnOneRoom.findMany({
          where: {
            OR: [
              {
                memberId1: args.targetMemberId,
              },
              {
                memberId2: args.targetMemberId,
              },
            ],
          },
          orderBy: {
            createdAt: args.sort || 'asc',
          },
        })
      },
    })
  },
})

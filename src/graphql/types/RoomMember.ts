import { RoomMember as RoomMemberType } from '@prisma/client'
import { extendType, objectType, stringArg } from 'nexus'

export const RoomMember = objectType({
  name: 'RoomMember',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('roomId')
    t.nonNull.string('userId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('room', {
      type: 'Room',
    })
    t.nonNull.field('user', {
      type: 'User',
    })
  },
})

export const GetRoomMembersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getRoomMembers', {
      type: 'RoomMember',
      args: {
        userId: stringArg(),
        roomId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        const query: Partial<RoomMemberType> = {}
        if (args.userId) query.userId = args.userId
        if (args.roomId) query.roomId = args.roomId

        return ctx.prisma.roomMember.findMany({
          where: query,
          include: {
            user: true,
            room: true,
          },
        })
      },
    })
  },
})

// export const CreateRoomMemberMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createRoomMember', {
//       type: 'RoomMember',
//       args: {
//         roomId: nonNull(stringArg()),
//         userId: nonNull(stringArg()),
//       },
//       async resolve(_parent, args, ctx) {
//         if (!ctx.user) {
//           throw new Error('ログインユーザーが存在しません')
//         }

//         const user = await ctx.prisma.user.findUnique({
//           where: {
//             id: args.userId,
//           },

//         })

//         const room = await ctx.prisma.room.findUnique({
//           where: {
//             id: args.roomId,
//           },
//         })

//         if (!user || !room) {
//           throw new Error('ユーザー、またはルームが存在しません')
//         }

//         return ctx.prisma.roomMember.create({
//           data: {
//             userId: args.userId,
//             roomId: args.roomId,
//           },
//           include: {
//             user: true,
//             room: true,
//           },
//         })
//       },
//     })
//   },
// })

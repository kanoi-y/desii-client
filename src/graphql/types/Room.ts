import {  Room as RoomType, RoomMember } from '@prisma/client'
import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.nonNull.string('id')
    t.string('groupId')
    t.string('latestMessageId')
    t.field('latestMessage', {
      type: 'Message',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetRoom', {
      type: 'Room',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.room.findUnique({
          where: {
            id: args.id,
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

export const GetRoomsByLoginUserIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetRoomsByLoginUserId', {
      type: 'Room',
      args: {
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const roomMembers = await ctx.prisma.roomMember.findMany({
          where: {
            userId: ctx.user.id,
          },
          include: {
            room: true,
          },
        })

        return roomMembers.map(
          (
            roomMember: RoomMember & {
              room: RoomType
            }
          ) => {
            return roomMember.room
          }
        )
      },
    })
  },
})

// 一対一のルームを作成する
export const CreateRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('CreateRoom', {
      type: 'Room',
      args: {
        memberId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        if (ctx.user.id === args.memberId) {
          throw new Error('自分とのルームは作成できません')
        }

        const room = await ctx.prisma.room.create({
          data: {},
        })

        await ctx.prisma.roomMember.createMany({
          data: [
            {
              roomId: room.id,
              userId: ctx.user.id,
            },
            {
              roomId: room.id,
              userId: args.memberId,
            },
          ],
        })

        return room
      },
    })
  },
})

// 一対一ルームを削除する
export const DeleteRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteRoom', {
      type: 'Room',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const room = await ctx.prisma.room.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!room) {
          throw new Error('ルームが存在しません')
        }

        if (room.groupId) {
          throw new Error(
            'グループに紐づいているルームはルームだけ削除することは出来ません'
          )
        }

        const roomMembers = await ctx.prisma.roomMember.findMany({
          where: {
            roomId: room.id,
          },
        })

        if (
          roomMembers.every((roomMember: RoomMember) => {
            roomMember.userId !== ctx.user?.id
          })
        ) {
          throw new Error('メンバーしかルームを削除することは出来ません')
        }

        return ctx.prisma.room.delete({
          where: {
            id: args.id,
          },
          include: {
            latestMessage: true,
          },
        })
      },
    })
  },
})

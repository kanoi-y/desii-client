import { Group, Room as RoomType, RoomMember } from '@prisma/client'
import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus'

export const GetRoomType = enumType({
  name: 'GetRoomType',
  members: ['ALL', 'ONLY_ONE_ON_ONE', 'ONLY_GROUP'],
})

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.nonNull.string('id')
    t.string('latestMessageId')
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
        })
      },
    })
  },
})

export const GetOneOnOneRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetOneOnOneRoom', {
      type: 'Room',
      args: {
        memberId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const roomMembers: (RoomMember & {
          room: RoomType
        })[] = await ctx.prisma.roomMember.findMany({
          where: {
            OR: [
              {
                userId: args.memberId,
              },
              {
                userId: ctx.user.id,
              },
            ],
          },
          include: {
            room: true,
          },
        })

        const roomIdRelatedByGroup = (
          await ctx.prisma.group.findMany({
            where: {
              OR: roomMembers.map(
                (
                  roomMember: RoomMember & {
                    room: RoomType
                  }
                ) => {
                  return {
                    roomId: roomMember.roomId,
                  }
                }
              ),
            },
          })
        ).map((group: Group) => group.roomId)

        return (
          roomMembers.find(
            (
              roomMember: RoomMember & {
                room: RoomType
              },
              index,
              self
            ) => {
              const selfIndex = self.findIndex(
                (
                  dataElement: RoomMember & {
                    room: RoomType
                  }
                ) => dataElement.roomId === roomMember.roomId
              )
              return (
                selfIndex !== index &&
                !roomIdRelatedByGroup.includes(roomMember.roomId)
              )
            }
          )?.room || null
        )
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
        getRoomType: nonNull(GetRoomType),
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

        const roomIdRelatedByGroup = (
          await ctx.prisma.group.findMany({
            where: {
              OR: roomMembers.map(
                (
                  roomMember: RoomMember & {
                    room: RoomType
                  }
                ) => {
                  return {
                    roomId: roomMember.roomId,
                  }
                }
              ),
            },
          })
        ).map((group: Group) => group.roomId)

        return roomMembers
          .map(
            (
              roomMember: RoomMember & {
                room: RoomType
              }
            ) => {
              return roomMember.room
            }
          )
          .filter((room: RoomType) => {
            if (args.getRoomType === 'ONLY_ONE_ON_ONE') {
              return !roomIdRelatedByGroup.includes(room.id)
            }
            if (args.getRoomType === 'ONLY_GROUP') {
              return roomIdRelatedByGroup.includes(room.id)
            }
            return true
          })
          .sort((a: RoomType, b: RoomType) => {
            return a.updatedAt < b.updatedAt ? 1 : -1
          })
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

        const group = await ctx.prisma.group.findUnique({
          where: {
            roomId: room.id,
          },
        })

        if (group) {
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
        })
      },
    })
  },
})

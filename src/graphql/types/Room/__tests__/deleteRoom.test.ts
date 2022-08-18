import { Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteRoomResolver } from '../resolver'

describe('deleteRoom', () => {
  let user: User
  let anotherUser: User
  let roomMemberUser: User
  let room: Room
  let roomRelatedByGroup: Room

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    anotherUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
    roomMemberUser = await prisma.user.create({
      data: {
        name: 'name3',
        email: 'email3',
        image: 'image3',
      },
    })
    room = await prisma.room.create({
      data: {},
    })
    roomRelatedByGroup = await prisma.room.create({
      data: {},
    })
    await prisma.group.create({
      data: {
        name: 'name',
        description: 'description',
        image: 'image',
        productId: 'productId',
        adminUserId: user.id,
        roomId: roomRelatedByGroup.id,
      },
    })
    await prisma.roomMember.createMany({
      data: [
        {
          roomId: room.id,
          userId: user.id,
        },
        {
          roomId: room.id,
          userId: roomMemberUser.id,
        },
      ],
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findRoomSpy = jest.spyOn(prisma.room, 'findUnique')
  const findGroupSpy = jest.spyOn(prisma.group, 'findUnique')
  const findRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findMany')
  const deleteRoomSpy = jest.spyOn(prisma.room, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteRoomResolver({
        id: room.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomSpy).not.toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームが存在しない', async () => {
    try {
      await deleteRoomResolver({
        id: 'id',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームが存在しません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('グループに紐づいているルームはルームだけ削除することは出来ない', async () => {
    try {
      await deleteRoomResolver({
        id: roomRelatedByGroup.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'グループに紐づいているルームはルームだけ削除することは出来ません'
        )
      )
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('メンバーしかルームを削除することは出来ない', async () => {
    try {
      await deleteRoomResolver({
        id: room.id,
        user: anotherUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('メンバーしかルームを削除することは出来ません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteRoomResolver({
      id: room.id,
      user,
    })

    expect(res).toEqual(room)
    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(deleteRoomSpy).toHaveBeenCalled()
  })
})

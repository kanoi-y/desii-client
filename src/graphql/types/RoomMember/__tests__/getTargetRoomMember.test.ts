import { Room, RoomMember, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getTargetRoomMemberResolver } from '../resolver'

describe('getTargetRoomMember', () => {
  let user: User
  let anotherUser: User
  let notRoomMemberUser: User
  let room: Room
  let roomRelatedByGroup: Room
  let anotherRoomMember: RoomMember

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
    notRoomMemberUser = await prisma.user.create({
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
        adminUserId: user.id,
        name: 'group',
        image: 'image',
        productId: 'productId',
        roomId: roomRelatedByGroup.id,
      },
    })
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: user.id,
      },
      include: {
        room: true,
        user: true,
      },
    })
    anotherRoomMember = await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: anotherUser.id,
      },
      include: {
        room: true,
        user: true,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findRoomSpy = jest.spyOn(prisma.room, 'findUnique')
  const findGroupSpy = jest.spyOn(prisma.group, 'findUnique')
  const findManyRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findMany')
  const findRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findFirst')

  test('ログインユーザーが存在しない', async () => {
    try {
      await getTargetRoomMemberResolver({
        roomId: room.id,
        userId: user.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomSpy).not.toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findManyRoomMemberSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('ルームが存在しない', async () => {
    try {
      await getTargetRoomMemberResolver({
        roomId: 'id',
        userId: user.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームが存在しません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findManyRoomMemberSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('ルームが一対一のルームではない', async () => {
    try {
      await getTargetRoomMemberResolver({
        roomId: roomRelatedByGroup.id,
        userId: user.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームが一対一のルームではありません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findManyRoomMemberSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('userIdがルームのメンバーのIDではない', async () => {
    try {
      await getTargetRoomMemberResolver({
        roomId: room.id,
        userId: notRoomMemberUser.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('userIdがルームのメンバーのIDではありません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findManyRoomMemberSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await getTargetRoomMemberResolver({
      roomId: room.id,
      userId: user.id,
      user,
    })

    expect(res).toEqual(anotherRoomMember)
    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findManyRoomMemberSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
  })
})

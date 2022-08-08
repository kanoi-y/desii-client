import { Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createMessageResolver } from '../resolver'

describe('createMessage', () => {
  let user: User
  let roomMemberUser: User
  let room: Room

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    roomMemberUser = await prisma.user.create({
      data: {
        name: 'roomMemberUserName',
        email: 'roomMemberUserEmail',
        image: 'roomMemberUserImage',
      },
    })
    room = await prisma.room.create({
      data: {},
    })
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: roomMemberUser.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findRoomSpy = jest.spyOn(prisma.room, 'findUnique')
  const findRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findMany')
  const createMessageSpy = jest.spyOn(prisma.message, 'create')
  const createReadManagementSpy = jest.spyOn(
    prisma.readManagement,
    'createMany'
  )
  const updateRoomSpy = jest.spyOn(prisma.room, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await createMessageResolver({
        body: 'body',
        messageType: 'TEXT',
        roomId: room.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(createMessageSpy).not.toHaveBeenCalled()
    expect(createReadManagementSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームが存在しない', async () => {
    try {
      await createMessageResolver({
        body: 'body',
        messageType: 'TEXT',
        roomId: 'roomId',
        user: roomMemberUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームが存在しません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(createMessageSpy).not.toHaveBeenCalled()
    expect(createReadManagementSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームに所属していないユーザーはメッセージを作成できない', async () => {
    try {
      await createMessageResolver({
        body: 'body',
        messageType: 'TEXT',
        roomId: room.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('ルームに所属していないユーザーはメッセージを作成できません')
      )
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(createMessageSpy).not.toHaveBeenCalled()
    expect(createReadManagementSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createMessageResolver({
      body: 'body',
      messageType: 'TEXT',
      roomId: room.id,
      user: roomMemberUser,
    })

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(createMessageSpy).toHaveBeenCalled()
    expect(createReadManagementSpy).toHaveBeenCalled()
    expect(updateRoomSpy).toHaveBeenCalled()
  })
})

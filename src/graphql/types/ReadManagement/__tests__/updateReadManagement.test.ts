import { Message, ReadManagement, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { updateReadManagementResolver } from '../resolver'

describe('updateReadManagement', () => {
  let user: User
  let createdMessageUser: User
  let roomMemberUser: User
  let room: Room
  let message: Message
  let readManagement: ReadManagement

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    createdMessageUser = await prisma.user.create({
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
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: createdMessageUser.id,
      },
    })
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: roomMemberUser.id,
      },
    })
    message = await prisma.message.create({
      data: {
        type: 'TEXT',
        roomId: room.id,
        userId: createdMessageUser.id,
        body: 'body',
      },
      include: {
        user: true,
        room: true,
      },
    })
    readManagement = await prisma.readManagement.create({
      data: {
        targetUserId: roomMemberUser.id,
        messageId: message.id,
        isRead: false,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findReadManagementSpy = jest.spyOn(prisma.readManagement, 'findUnique')
  const updateReadManagementSpy = jest.spyOn(prisma.readManagement, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await updateReadManagementResolver({
        messageId: message.id,
        targetUserId: roomMemberUser.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findReadManagementSpy).not.toHaveBeenCalled()
    expect(updateReadManagementSpy).not.toHaveBeenCalled()
  })

  test('既読管理が存在しない', async () => {
    try {
      await updateReadManagementResolver({
        messageId: 'id',
        targetUserId: roomMemberUser.id,
        user: roomMemberUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('既読管理が存在しません'))
    }

    expect(findReadManagementSpy).toHaveBeenCalled()
    expect(updateReadManagementSpy).not.toHaveBeenCalled()
  })

  test('自分の既読管理しか更新することは出来ない', async () => {
    try {
      await updateReadManagementResolver({
        messageId: message.id,
        targetUserId: roomMemberUser.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('自分の既読管理しか更新することは出来ません'))
    }

    expect(findReadManagementSpy).toHaveBeenCalled()
    expect(updateReadManagementSpy).not.toHaveBeenCalled()
  })


  test('成功', async () => {
    const res = await updateReadManagementResolver({
      messageId: message.id,
      targetUserId: roomMemberUser.id,
      user: roomMemberUser,
    })

    expect(res.isRead).toEqual(true)
    expect(findReadManagementSpy).toHaveBeenCalled()
    expect(updateReadManagementSpy).toHaveBeenCalled()
  })
})

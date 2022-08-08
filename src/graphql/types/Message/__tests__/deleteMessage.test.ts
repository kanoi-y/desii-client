import { Message, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteMessageResolver } from '../resolver'

describe('deleteMessage', () => {
  let user: User
  let roomMemberUser: User
  let room: Room
  let message: Message

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
    message = await prisma.message.create({
      data: {
        type: 'TEXT',
        roomId: room.id,
        userId: roomMemberUser.id,
        body: 'body',
      },
      include: {
        user: true,
        room: true,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findMessageSpy = jest.spyOn(prisma.message, 'findUnique')
  const deleteMessageSpy = jest.spyOn(prisma.message, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteMessageResolver({
        id: message.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findMessageSpy).not.toHaveBeenCalled()
    expect(deleteMessageSpy).not.toHaveBeenCalled()
  })

  test('メッセージが存在しない', async () => {
    try {
      await deleteMessageResolver({
        id: 'id',
        user: roomMemberUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('メッセージが存在しません'))
    }

    expect(findMessageSpy).toHaveBeenCalled()
    expect(deleteMessageSpy).not.toHaveBeenCalled()
  })

  test('メッセージの作成者しか削除することは出来ない', async () => {
    try {
      await deleteMessageResolver({
        id: message.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('メッセージの作成者しか削除することは出来ません'))
    }

    expect(findMessageSpy).toHaveBeenCalled()
    expect(deleteMessageSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteMessageResolver({
      id: message.id,
      user: roomMemberUser,
    })

    expect(res).toEqual(message)
    expect(findMessageSpy).toHaveBeenCalled()
    expect(deleteMessageSpy).toHaveBeenCalled()
  })
})

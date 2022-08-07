import { Message, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getMessagesResolver } from '../resolver'

describe('getMessages', () => {
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

  const findRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findMany')
  const findMessageSpy = jest.spyOn(prisma.message, 'findMany')

  test('ログインユーザーが存在しない', async () => {
    try {
      await getMessagesResolver({
        sort: null,
        user: null,
        roomId: room.id,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(findMessageSpy).not.toHaveBeenCalled()
  })

  test('ルームに所属していないユーザーはメッセージを取得できない', async () => {
    try {
      await getMessagesResolver({
        sort: null,
        user,
        roomId: room.id,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('ルームに所属していないユーザーはメッセージを取得できません')
      )
    }

    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findMessageSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await getMessagesResolver({
      sort: null,
      user: roomMemberUser,
      roomId: room.id,
    })

    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findMessageSpy).toHaveBeenCalled()
    expect(res).toEqual([message])
  })
})

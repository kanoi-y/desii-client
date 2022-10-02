import { Message, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  messageFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import { getMessagesResolver } from '../resolver'

describe('getMessages', () => {
  let user: User
  let roomMemberUser: User
  let room: Room
  let roomMember: RoomMember
  let message: Message

  beforeAll(async () => {
    user = userFactory()
    roomMemberUser = userFactory()
    room = roomFactory()
    roomMember = roomMemberFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
    message = messageFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
  })

  const findRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'findMany')
  const findMessageSpy = jest.spyOn(prismaMock.message, 'findMany')

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
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember])
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
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember])
    prismaMock.message.findMany.mockResolvedValue([message])
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

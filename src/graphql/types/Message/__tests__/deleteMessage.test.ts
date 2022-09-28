import { Message, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  messageFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import { deleteMessageResolver } from '../resolver'

describe('deleteMessage', () => {
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

  const findMessageSpy = jest.spyOn(prismaMock.message, 'findUnique')
  const deleteMessageSpy = jest.spyOn(prismaMock.message, 'delete')

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
    prismaMock.message.findUnique.mockResolvedValue(null)
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
    prismaMock.message.findUnique.mockResolvedValue(message)
    try {
      await deleteMessageResolver({
        id: message.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('メッセージの作成者しか削除することは出来ません')
      )
    }

    expect(findMessageSpy).toHaveBeenCalled()
    expect(deleteMessageSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.message.findUnique.mockResolvedValue(message)
    prismaMock.message.delete.mockResolvedValue(message)
    const res = await deleteMessageResolver({
      id: message.id,
      user: roomMemberUser,
    })

    expect(res).toEqual(message)
    expect(findMessageSpy).toHaveBeenCalled()
    expect(deleteMessageSpy).toHaveBeenCalled()
  })
})

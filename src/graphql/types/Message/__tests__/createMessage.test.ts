import { Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  messageFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import * as createReadManagementsResolver from '../resolver'
import { createMessageResolver } from '../resolver'

describe('createMessage', () => {
  let user: User
  let roomMemberUser: User
  let room: Room
  let roomMember: RoomMember

  beforeAll(async () => {
    user = userFactory()
    roomMemberUser = userFactory()
    room = roomFactory()
    roomMember = roomMemberFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
  })

  const findRoomSpy = jest.spyOn(prismaMock.room, 'findUnique')
  const findRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'findMany')
  const createMessageSpy = jest.spyOn(prismaMock.message, 'create')
  const createReadManagementsSpy = jest.spyOn(
    createReadManagementsResolver,
    'createReadManagements'
  )
  const updateRoomSpy = jest.spyOn(prismaMock.room, 'update')

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
    expect(createReadManagementsSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームが存在しない', async () => {
    prismaMock.room.findUnique.mockResolvedValue(null)
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
    expect(createReadManagementsSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームに所属していないユーザーはメッセージを作成できない', async () => {
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember])
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
    expect(createReadManagementsSpy).not.toHaveBeenCalled()
    expect(updateRoomSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const message = messageFactory({
      roomId: room.id,
      userId: user.id,
    })
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember])
    prismaMock.message.create.mockResolvedValue(message)
    prismaMock.room.update.mockResolvedValue({
      ...room,
      latestMessageId: message.id,
    })
    await createMessageResolver({
      body: 'body',
      messageType: 'TEXT',
      roomId: room.id,
      user: roomMemberUser,
    })

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(createMessageSpy).toHaveBeenCalled()
    expect(createReadManagementsSpy).toHaveBeenCalled()
    expect(updateRoomSpy).toHaveBeenCalled()
  })
})

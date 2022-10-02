import { Message, ReadManagement, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  messageFactory,
  readManagementFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import { updateReadManagementResolver } from '../resolver'

describe('updateReadManagement', () => {
  let user: User
  let createdMessageUser: User
  let roomMemberUser: User
  let room: Room
  let createdMessageRoomMember: RoomMember
  let roomMember: RoomMember
  let message: Message
  let readManagement: ReadManagement

  beforeAll(async () => {
    user = userFactory()
    createdMessageUser = userFactory()
    roomMemberUser = userFactory()
    room = roomFactory()
    createdMessageRoomMember = roomMemberFactory({
      roomId: room.id,
      userId: createdMessageUser.id,
    })
    roomMember = roomMemberFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
    message = messageFactory({
      roomId: room.id,
      userId: createdMessageUser.id,
    })
    readManagement = readManagementFactory({
      targetUserId: roomMemberUser.id,
      messageId: message.id,
      isRead: false,
    })
  })

  const findReadManagementSpy = jest.spyOn(
    prismaMock.readManagement,
    'findUnique'
  )
  const updateReadManagementSpy = jest.spyOn(
    prismaMock.readManagement,
    'update'
  )

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
    prismaMock.readManagement.findUnique.mockResolvedValue(null)
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
    prismaMock.readManagement.findUnique.mockResolvedValue(readManagement)
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
    prismaMock.readManagement.findUnique.mockResolvedValue(readManagement)
    prismaMock.readManagement.update.mockResolvedValue({
      ...readManagement,
      isRead: true,
    })
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

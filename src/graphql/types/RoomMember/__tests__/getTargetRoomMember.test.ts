import { Group, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  groupFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import { getTargetRoomMemberResolver } from '../resolver'

describe('getTargetRoomMember', () => {
  let user: User
  let anotherUser: User
  let notRoomMemberUser: User
  let room: Room
  let roomRelatedByGroup: Room
  let group: Group
  let roomMember: RoomMember & { room: Room; user: User }
  let anotherRoomMember: RoomMember & { room: Room; user: User }

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
    notRoomMemberUser = userFactory()
    room = roomFactory()
    roomRelatedByGroup = roomFactory()
    group = groupFactory({
      adminUserId: user.id,
      roomId: roomRelatedByGroup.id,
    })
    roomMember = {
      ...roomMemberFactory({
        roomId: room.id,
        userId: user.id,
      }),
      room,
      user,
    }
    anotherRoomMember = {
      ...roomMemberFactory({
        roomId: room.id,
        userId: anotherUser.id,
      }),
      room,
      user: anotherUser,
    }
  })

  const findRoomSpy = jest.spyOn(prismaMock.room, 'findUnique')
  const findGroupSpy = jest.spyOn(prismaMock.group, 'findUnique')
  const findManyRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'findMany')
  const findRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'findFirst')

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
    prismaMock.room.findUnique.mockResolvedValue(null)
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
    prismaMock.room.findUnique.mockResolvedValue(roomRelatedByGroup)
    prismaMock.group.findUnique.mockResolvedValue(group)
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
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.group.findUnique.mockResolvedValue(null)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember, anotherRoomMember])
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
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.group.findUnique.mockResolvedValue(null)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember, anotherRoomMember])
    prismaMock.roomMember.findFirst.mockResolvedValue(anotherRoomMember)
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

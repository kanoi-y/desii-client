import { Group, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  groupFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
} from '../../../factories'
import { deleteRoomResolver } from '../resolver'

describe('deleteRoom', () => {
  let user: User
  let anotherUser: User
  let roomMemberUser: User
  let room: Room
  let roomRelatedByGroup: Room
  let group: Group
  let roomMember1: RoomMember
  let roomMember2: RoomMember

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
    roomMemberUser = userFactory()
    room = roomFactory()
    roomRelatedByGroup = roomFactory()
    group = groupFactory({
      adminUserId: user.id,
      roomId: roomRelatedByGroup.id,
    })

    roomMember1 = roomMemberFactory({
      roomId: room.id,
      userId: user.id,
    })
    roomMember2 = roomMemberFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
  })

  const findRoomSpy = jest.spyOn(prismaMock.room, 'findUnique')
  const findGroupSpy = jest.spyOn(prismaMock.group, 'findUnique')
  const findRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'findMany')
  const deleteRoomSpy = jest.spyOn(prismaMock.room, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteRoomResolver({
        id: room.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomSpy).not.toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('ルームが存在しない', async () => {
    prismaMock.room.findUnique.mockResolvedValue(null)
    try {
      await deleteRoomResolver({
        id: 'id',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームが存在しません'))
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('グループに紐づいているルームはルームだけ削除することは出来ない', async () => {
    prismaMock.room.findUnique.mockResolvedValue(roomRelatedByGroup)
    prismaMock.group.findUnique.mockResolvedValue(group)
    try {
      await deleteRoomResolver({
        id: roomRelatedByGroup.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'グループに紐づいているルームはルームだけ削除することは出来ません'
        )
      )
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('メンバーしかルームを削除することは出来ない', async () => {
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.group.findUnique.mockResolvedValue(null)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember1, roomMember2])
    try {
      await deleteRoomResolver({
        id: room.id,
        user: anotherUser,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('メンバーしかルームを削除することは出来ません')
      )
    }

    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.room.findUnique.mockResolvedValue(room)
    prismaMock.group.findUnique.mockResolvedValue(null)
    prismaMock.roomMember.findMany.mockResolvedValue([roomMember1, roomMember2])
    prismaMock.room.delete.mockResolvedValue(room)

    const res = await deleteRoomResolver({
      id: room.id,
      user,
    })

    expect(res).toEqual(room)
    expect(findRoomSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(deleteRoomSpy).toHaveBeenCalled()
  })
})

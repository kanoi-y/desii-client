import { Group, Room, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { groupFactory, roomFactory, userFactory } from '../../../factories'
import { deleteGroupResolver } from '../resolver'

describe('deleteGroup', () => {
  let user: User
  let adminUser: User
  let room: Room
  let group: Group

  beforeAll(async () => {
    user = userFactory()
    adminUser = userFactory()
    room = roomFactory()
    group = groupFactory({
      adminUserId: adminUser.id,
      roomId: room.id,
    })
  })

  const findGroupSpy = jest.spyOn(prismaMock.group, 'findUnique')
  const deleteGroupSpy = jest.spyOn(prismaMock.group, 'delete')
  const deleteRoomSpy = jest.spyOn(prismaMock.room, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteGroupResolver({
        user: null,
        id: group.id,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(deleteGroupSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('グループが存在しない', async () => {
    prismaMock.group.findUnique.mockResolvedValue(null)
    try {
      await deleteGroupResolver({
        user,
        id: 'id',
      })
    } catch (e) {
      expect(e).toEqual(new Error('グループが存在しません'))
    }

    expect(findGroupSpy).toHaveBeenCalled()
    expect(deleteGroupSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('ユーザーがチームの管理者ではない', async () => {
    prismaMock.group.findUnique.mockResolvedValue(group)
    try {
      await deleteGroupResolver({
        user,
        id: group.id,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーがチームの管理者ではありません'))
    }

    expect(findGroupSpy).toHaveBeenCalled()
    expect(deleteGroupSpy).not.toHaveBeenCalled()
    expect(deleteRoomSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.group.findUnique.mockResolvedValue(group)
    prismaMock.group.delete.mockResolvedValue(group)
    prismaMock.room.delete.mockResolvedValue(room)
    const res = await deleteGroupResolver({
      user: adminUser,
      id: group.id,
    })

    expect(res).toEqual(group)
    expect(findGroupSpy).toHaveBeenCalled()
    expect(deleteGroupSpy).toHaveBeenCalled()
    expect(deleteRoomSpy).toHaveBeenCalled()
  })
})

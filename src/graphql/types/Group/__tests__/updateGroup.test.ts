import { Group, Room, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { groupFactory, roomFactory, userFactory } from '../../../factories'
import { updateGroupResolver } from '../resolver'

describe('updateGroup', () => {
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
  const updateGroupSpy = jest.spyOn(prismaMock.group, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await updateGroupResolver({
        user: null,
        id: group.id,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(updateGroupSpy).not.toHaveBeenCalled()
  })

  test('グループが存在しない', async () => {
    prismaMock.group.findUnique.mockResolvedValue(null)
    try {
      await updateGroupResolver({
        user,
        id: 'id',
      })
    } catch (e) {
      expect(e).toEqual(new Error('グループが存在しません'))
    }

    expect(findGroupSpy).toHaveBeenCalled()
    expect(updateGroupSpy).not.toHaveBeenCalled()
  })

  test('ユーザーがチームの管理者ではない', async () => {
    prismaMock.group.findUnique.mockResolvedValue(group)
    try {
      await updateGroupResolver({
        user,
        id: group.id,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーがチームの管理者ではありません'))
    }

    expect(findGroupSpy).toHaveBeenCalled()
    expect(updateGroupSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.group.findUnique.mockResolvedValue(group)
    prismaMock.group.update.mockResolvedValue({
      ...group,
      name: 'update group',
    })
    const res = await updateGroupResolver({
      user: adminUser,
      id: group.id,
      name: 'update group',
    })

    expect(res.name).toEqual('update group')
    expect(findGroupSpy).toHaveBeenCalled()
    expect(updateGroupSpy).toHaveBeenCalled()
  })
})

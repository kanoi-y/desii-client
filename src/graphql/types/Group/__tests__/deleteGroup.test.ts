import { Group, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteGroupResolver } from '../resolver'

describe('deleteGroup', () => {
  let user: User
  let adminUser: User
  let room: Room
  let group: Group

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })

    adminUser = await prisma.user.create({
      data: {
        name: 'adminUserName',
        email: 'adminUserEmail',
        image: 'adminUserImage',
      },
    })

    room = await prisma.room.create({
      data: {},
    })

    group = await prisma.group.create({
      data: {
        adminUserId: adminUser.id,
        name: 'group',
        image: 'image',
        productId: 'productId',
        roomId: room.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findGroupSpy = jest.spyOn(prisma.group, 'findUnique')
  const deleteGroupSpy = jest.spyOn(prisma.group, 'delete')
  const deleteRoomSpy = jest.spyOn(prisma.room, 'delete')

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

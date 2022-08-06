import { Group, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { updateGroupResolver } from '../resolver'

describe('updateGroup', () => {
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
  const updateGroupSpy = jest.spyOn(prisma.group, 'update')

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

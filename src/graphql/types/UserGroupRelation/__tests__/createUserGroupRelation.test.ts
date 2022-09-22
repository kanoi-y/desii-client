import { Group, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createUserGroupRelationResolver } from '../resolver'

describe('createUserGroupRelation', () => {
  let user: User
  let adminUser: User
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
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
    const room = await prisma.room.create({
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

  const findUserSpy = jest.spyOn(prisma.user, 'findUnique')
  const findGroupSpy = jest.spyOn(prisma.group, 'findUnique')
  const createRoomMemberSpy = jest.spyOn(prisma.roomMember, 'create')
  const createUserGroupRelationSpy = jest.spyOn(
    prisma.userGroupRelation,
    'create'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await createUserGroupRelationResolver({
        groupId: group.id,
        userId: user.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUserSpy).not.toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('ユーザー、またはグループが存在しない', async () => {
    try {
      await createUserGroupRelationResolver({
        groupId: 'groupId',
        userId: user.id,
        user: adminUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザー、またはグループが存在しません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('管理者ユーザーしかユーザーを追加できない', async () => {
    try {
      await createUserGroupRelationResolver({
        groupId: group.id,
        userId: user.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('管理者ユーザーしかユーザーを追加できません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createUserGroupRelationResolver({
      groupId: group.id,
      userId: user.id,
      user: adminUser,
    })

    expect(findUserSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).toHaveBeenCalled()
    expect(createUserGroupRelationSpy).toHaveBeenCalled()
  })
})

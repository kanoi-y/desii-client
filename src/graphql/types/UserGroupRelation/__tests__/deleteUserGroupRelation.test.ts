import { Group, User, UserGroupRelation } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { DeleteUserGroupRelationResolver } from '../resolver'

describe('deleteUserGroupRelation', () => {
  let user: User
  let adminUser: User
  let group: Group
  let userGroupRelation: UserGroupRelation & {
    user: User
    group: Group
  }

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
    await prisma.userGroupRelation.create({
      data: {
        userId: adminUser.id,
        groupId: group.id,
      },
      include: {
        user: true,
        group: true,
      },
    })
    userGroupRelation = await prisma.userGroupRelation.create({
      data: {
        userId: user.id,
        groupId: group.id,
      },
      include: {
        user: true,
        group: true,
      },
    })
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: user.id,
      },
    })
    await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: adminUser.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findUserGroupRelationSpy = jest.spyOn(
    prisma.userGroupRelation,
    'findUnique'
  )
  const deleteRoomMemberSpy = jest.spyOn(prisma.roomMember, 'delete')
  const deleteUserGroupRelationSpy = jest.spyOn(
    prisma.userGroupRelation,
    'delete'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await DeleteUserGroupRelationResolver({
        groupId: group.id,
        userId: user.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUserGroupRelationSpy).not.toHaveBeenCalled()
    expect(deleteRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('userGroupRelationが存在しない', async () => {
    try {
      await DeleteUserGroupRelationResolver({
        groupId: 'groupId',
        userId: user.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('userGroupRelationが存在しません'))
    }

    expect(findUserGroupRelationSpy).toHaveBeenCalled()
    expect(deleteRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('管理者ユーザー以外は、自分以外のユーザーを削除することは出来ない', async () => {
    try {
      await DeleteUserGroupRelationResolver({
        groupId: group.id,
        userId: adminUser.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error(
          '管理者ユーザー以外は、自分以外のユーザーを削除することは出来ません'
        )
      )
    }

    expect(findUserGroupRelationSpy).toHaveBeenCalled()
    expect(deleteRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('グループからグループの管理者を削除することは出来ない', async () => {
    try {
      await DeleteUserGroupRelationResolver({
        groupId: group.id,
        userId: adminUser.id,
        user: adminUser,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'グループからグループの管理者を削除することは出来ません'
        )
      )
    }

    expect(findUserGroupRelationSpy).toHaveBeenCalled()
    expect(deleteRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await DeleteUserGroupRelationResolver({
      groupId: group.id,
      userId: user.id,
      user: adminUser,
    })

    expect(res).toEqual(userGroupRelation)
    expect(findUserGroupRelationSpy).toHaveBeenCalled()
    expect(deleteRoomMemberSpy).toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).toHaveBeenCalled()
  })
})

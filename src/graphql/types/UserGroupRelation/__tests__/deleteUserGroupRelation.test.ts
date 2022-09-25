import {
  Group,
  Room,
  RoomMember,
  User,
  UserGroupRelation,
} from '@prisma/client'
import { prismaMock } from 'singleton'
import * as userGroupRelationResolver from '../resolver'
import { DeleteUserGroupRelationResolver } from '../resolver'

describe('deleteUserGroupRelation', () => {
  let user: User
  let adminUser: User
  let room: Room
  let group: Group
  let userGroupRelation: UserGroupRelation & {
    user: User
    group: Group
  }
  let adminUserGroupRelation: UserGroupRelation & {
    user: User
    group: Group
  }
  let roomMember: RoomMember
  let adminRoomMember: RoomMember

  beforeAll(async () => {
    user = {
      id: 'userId',
      name: 'name',
      email: 'email',
      description: 'description',
      image: 'image',
      emailVerified: null,
      accessToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    adminUser = {
      id: 'adminUserId',
      name: 'name2',
      email: 'email2',
      description: 'description2',
      image: 'image2',
      emailVerified: null,
      accessToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    room = {
      id: 'roomId',
      latestMessageId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    group = {
      id: 'groupId',
      description: 'description',
      adminUserId: adminUser.id,
      name: 'group',
      image: 'image',
      productId: 'productId',
      roomId: room.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    adminUserGroupRelation = {
      id: 'adminUserGroupRelationId',
      userId: adminUser.id,
      groupId: group.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: adminUser,
      group,
    }
    userGroupRelation = {
      id: 'userGroupRelationId',
      userId: user.id,
      groupId: group.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      user,
      group,
    }
    roomMember = {
      id: 'roomMemberId',
      userId: user.id,
      roomId: room.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    adminRoomMember = {
      id: 'adminRoomMemberId',
      userId: adminUser.id,
      roomId: room.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  const findUserGroupRelationSpy = jest.spyOn(
    prismaMock.userGroupRelation,
    'findUnique'
  )
  const deleteRoomMemberSpy = jest.spyOn(
    userGroupRelationResolver,
    'deleteRoomMember'
  )
  const deleteUserGroupRelationSpy = jest.spyOn(
    prismaMock.userGroupRelation,
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
    prismaMock.userGroupRelation.findUnique.mockResolvedValue(null)
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
    prismaMock.userGroupRelation.findUnique.mockResolvedValue(adminUserGroupRelation)
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
    prismaMock.userGroupRelation.findUnique.mockResolvedValue(adminUserGroupRelation)
    try {
      await DeleteUserGroupRelationResolver({
        groupId: group.id,
        userId: adminUser.id,
        user: adminUser,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('グループからグループの管理者を削除することは出来ません')
      )
    }

    expect(findUserGroupRelationSpy).toHaveBeenCalled()
    expect(deleteRoomMemberSpy).not.toHaveBeenCalled()
    expect(deleteUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.userGroupRelation.findUnique.mockResolvedValue(userGroupRelation)
    prismaMock.userGroupRelation.delete.mockResolvedValue(userGroupRelation)
    prismaMock.room.findUnique.mockResolvedValue(room)
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

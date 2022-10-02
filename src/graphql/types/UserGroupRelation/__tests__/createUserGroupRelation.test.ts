import { Group, Room, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { groupFactory, roomFactory, userFactory } from '../../../factories'
import * as userGroupRelationResolver from '../resolver'
import { createUserGroupRelationResolver } from '../resolver'

describe('createUserGroupRelation', () => {
  let user: User
  let adminUser: User
  let room: Room
  let group: Group

  beforeAll(async () => {
    user = userFactory()
    adminUser = userFactory()
    room = roomFactory()
    group = groupFactory({ adminUserId: adminUser.id, roomId: room.id })
  })

  const findUserSpy = jest.spyOn(prismaMock.user, 'findUnique')
  const findGroupSpy = jest.spyOn(prismaMock.group, 'findUnique')
  const createRoomMemberSpy = jest.spyOn(
    userGroupRelationResolver,
    'createRoomMember'
  )
  const createUserGroupRelationSpy = jest.spyOn(
    prismaMock.userGroupRelation,
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
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('ユーザー、またはグループが存在しない', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)
    prismaMock.group.findUnique.mockResolvedValue(null)
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
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('管理者ユーザーしかユーザーを追加できない', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)
    prismaMock.group.findUnique.mockResolvedValue(group)

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
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)
    prismaMock.group.findUnique.mockResolvedValue(group)
    prismaMock.room.findUnique.mockResolvedValue(room)

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

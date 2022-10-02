import { Group, Room, User, UserGroupRelation } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  groupFactory,
  roomFactory,
  userFactory,
  userGroupRelationFactory,
} from '../../../factories'
import { createPostResolver } from '../resolver'

describe('createPost', () => {
  let user: User
  let groupMemberUser: User
  let room: Room
  let group: Group
  let userGroupRelation: UserGroupRelation

  beforeAll(async () => {
    user = userFactory()
    groupMemberUser = userFactory()
    room = roomFactory()
    group = groupFactory({
      adminUserId: user.id,
      roomId: room.id,
    })
    userGroupRelation = userGroupRelationFactory({
      userId: groupMemberUser.id,
      groupId: group.id,
    })
  })

  const createPostSpy = jest.spyOn(prismaMock.post, 'create')
  const findUserGroupRelationSpy = jest.spyOn(
    prismaMock.userGroupRelation,
    'findMany'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await createPostResolver({
        title: 'title',
        content: 'content',
        category: 'GIVE_ME',
        isPrivate: false,
        bgImage: 'bgImage',
        groupId: null,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(createPostSpy).not.toHaveBeenCalled()
    expect(findUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('グループに所属していないユーザーは作成できない', async () => {
    prismaMock.userGroupRelation.findMany.mockResolvedValue([])
    try {
      await createPostResolver({
        title: 'title',
        content: 'content',
        category: 'GIVE_ME',
        isPrivate: false,
        bgImage: 'bgImage',
        groupId: group.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('グループに所属していないユーザーは作成できません')
      )
    }

    expect(createPostSpy).not.toHaveBeenCalled()
    expect(findUserGroupRelationSpy).toHaveBeenCalled()
  })

  test('groupIdありの成功', async () => {
    prismaMock.userGroupRelation.findMany.mockResolvedValue([userGroupRelation])
    await createPostResolver({
      title: 'title',
      content: 'content',
      category: 'GIVE_ME',
      isPrivate: false,
      bgImage: 'bgImage',
      groupId: group.id,
      user: groupMemberUser,
    })

    expect(createPostSpy).toHaveBeenCalled()
    expect(findUserGroupRelationSpy).toHaveBeenCalled()
  })

  test('成功', async () => {
    await createPostResolver({
      title: 'title',
      content: 'content',
      category: 'GIVE_ME',
      isPrivate: false,
      bgImage: 'bgImage',
      groupId: null,
      user,
    })

    expect(createPostSpy).toHaveBeenCalled()
    expect(findUserGroupRelationSpy).not.toHaveBeenCalled()
  })
})

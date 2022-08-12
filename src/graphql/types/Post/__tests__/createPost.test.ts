import { Group, Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createPostResolver } from '../resolver'

describe('createPost', () => {
  let user: User
  let groupMemberUser: User
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
    groupMemberUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
    room = await prisma.room.create({
      data: {},
    })
    group = await prisma.group.create({
      data: {
        adminUserId: user.id,
        name: 'group',
        image: 'image',
        productId: 'productId',
        roomId: room.id,
      },
    })
    await prisma.userGroupRelation.create({
      data: {
        userId: groupMemberUser.id,
        groupId: group.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const createPostSpy = jest.spyOn(prisma.post, 'create')
  const findUserGroupRelationSpy = jest.spyOn(
    prisma.userGroupRelation,
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
      expect(e).toEqual(new Error('グループに所属していないユーザーは作成できません'))
    }

    expect(createPostSpy).not.toHaveBeenCalled()
    expect(findUserGroupRelationSpy).toHaveBeenCalled()
  })

  test('groupIdありの成功', async () => {
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

import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createGroupResolver } from '../resolver'

describe('createGroup', () => {
  let user: User

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const createGroupSpy = jest.spyOn(prisma.group, 'create')
  const createRoomSpy = jest.spyOn(prisma.room, 'create')
  const createRoomMemberSpy = jest.spyOn(prisma.roomMember, 'create')
  const createUserGroupRelationSpy = jest.spyOn(
    prisma.userGroupRelation,
    'create'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await createGroupResolver({
        user: null,
        name: 'group',
        image: 'image',
        productId: 'productId',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(createGroupSpy).not.toHaveBeenCalled()
    expect(createRoomSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createGroupResolver({
      user,
      name: 'group',
      image: 'image',
      productId: 'productId',
    })

    expect(createGroupSpy).toHaveBeenCalled()
    expect(createRoomSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).toHaveBeenCalled()
    expect(createUserGroupRelationSpy).toHaveBeenCalled()
  })
})

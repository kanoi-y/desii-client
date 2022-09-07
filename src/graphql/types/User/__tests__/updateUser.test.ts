import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { updateUserResolver } from '../resolver'

describe('updateUser', () => {
  let user: User
  let anotherUser: User

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    anotherUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findUserSpy = jest.spyOn(prisma.user, 'findUnique')
  const updateUserSpy = jest.spyOn(prisma.user, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await updateUserResolver({
        id: user.id,
        user: null,
        name: 'name update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUserSpy).not.toHaveBeenCalled()
    expect(updateUserSpy).not.toHaveBeenCalled()
  })

  test('ユーザーが存在しない', async () => {
    try {
      await updateUserResolver({
        id: 'userId',
        user,
        name: 'name update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーが存在しません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(updateUserSpy).not.toHaveBeenCalled()
  })

  test('ユーザーとログインユーザーが異なっている', async () => {
    try {
      await updateUserResolver({
        id: anotherUser.id,
        user,
        name: 'name update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーとログインユーザーが異なっています'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(updateUserSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await updateUserResolver({
      id: user.id,
      user,
      name: 'name update',
    })

    expect(res.name).toEqual('name update')
    expect(findUserSpy).toHaveBeenCalled()
    expect(updateUserSpy).toHaveBeenCalled()
  })
})

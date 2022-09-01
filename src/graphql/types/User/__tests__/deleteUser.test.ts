import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteUserResolver } from '../resolver'

describe('deleteUser', () => {
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
  const deleteUserSpy = jest.spyOn(prisma.user, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteUserResolver({
        id: user.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUserSpy).not.toHaveBeenCalled()
    expect(deleteUserSpy).not.toHaveBeenCalled()
  })

  test('ユーザーが存在しない', async () => {
    try {
      await deleteUserResolver({
        id: 'id',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーが存在しません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(deleteUserSpy).not.toHaveBeenCalled()
  })

  test('ユーザーとログインユーザーが異なっている', async () => {
    try {
      await deleteUserResolver({
        id: anotherUser.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ユーザーとログインユーザーが異なっています'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(deleteUserSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteUserResolver({
      id: user.id,
      user,
    })

    expect(res).toEqual(user)
    expect(findUserSpy).toHaveBeenCalled()
    expect(deleteUserSpy).toHaveBeenCalled()
  })
})

import { User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { deleteUserResolver } from '../resolver'

describe('deleteUser', () => {
  let user: User
  let anotherUser: User

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
    anotherUser = {
      id: 'anotherUserId',
      name: 'name2',
      email: 'email2',
      description: 'description2',
      image: 'image2',
      emailVerified: null,
      accessToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  const findUserSpy = jest.spyOn(prismaMock.user, 'findUnique')
  const deleteUserSpy = jest.spyOn(prismaMock.user, 'delete')

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
    prismaMock.user.findUnique.mockResolvedValue(null)
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
    prismaMock.user.findUnique.mockResolvedValue(anotherUser)
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
    prismaMock.user.findUnique.mockResolvedValue(user)
    prismaMock.user.delete.mockResolvedValue(user)
    const res = await deleteUserResolver({
      id: user.id,
      user,
    })

    expect(res).toEqual(user)
    expect(findUserSpy).toHaveBeenCalled()
    expect(deleteUserSpy).toHaveBeenCalled()
  })
})

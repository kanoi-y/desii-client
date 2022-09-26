import { User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { userFactory } from '../../../factories'
import { updateUserResolver } from '../resolver'

describe('updateUser', () => {
  let user: User
  let anotherUser: User

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
  })

  const findUserSpy = jest.spyOn(prismaMock.user, 'findUnique')
  const updateUserSpy = jest.spyOn(prismaMock.user, 'update')

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
    prismaMock.user.findUnique.mockResolvedValue(null)
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
    prismaMock.user.findUnique.mockResolvedValue(anotherUser)
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
    const updateNameUser = {
      ...user,
      name: 'name update',
    }
    prismaMock.user.findUnique.mockResolvedValue(user)
    prismaMock.user.update.mockResolvedValue(updateNameUser)

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

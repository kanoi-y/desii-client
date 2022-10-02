import { Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { postFactory, userFactory } from '../../../factories'
import { deletePostResolver } from '../resolver'

describe('deletePost', () => {
  let user: User
  let createdUser: User
  let post: Post

  beforeAll(async () => {
    user = userFactory()
    createdUser = userFactory()
    post = postFactory({
      createdUserId: createdUser.id,
    })
  })

  const findPostSpy = jest.spyOn(prismaMock.post, 'findUnique')
  const deletePostSpy = jest.spyOn(prismaMock.post, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deletePostResolver({
        id: post.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findPostSpy).not.toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    try {
      await deletePostResolver({
        id: 'id',
        user: createdUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿が存在しません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('投稿は作成者しか削除できない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    try {
      await deletePostResolver({
        id: post.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿は作成者しか削除できません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    await deletePostResolver({
      id: post.id,
      user: createdUser,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).toHaveBeenCalled()
  })
})

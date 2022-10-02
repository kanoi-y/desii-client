import { Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { postFactory, userFactory } from '../../../factories'
import { updatePostResolver } from '../resolver'

describe('updatePost', () => {
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
  const updatePostSpy = jest.spyOn(prismaMock.post, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await updatePostResolver({
        id: post.id,
        user: null,
        title: 'title update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findPostSpy).not.toHaveBeenCalled()
    expect(updatePostSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    try {
      await updatePostResolver({
        id: 'id',
        user: createdUser,
        title: 'title update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿が存在しません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(updatePostSpy).not.toHaveBeenCalled()
  })

  test('投稿は作成者以外更新できない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    try {
      await updatePostResolver({
        id: post.id,
        user,
        title: 'title update',
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿は作成者しか更新できません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(updatePostSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    prismaMock.post.update.mockResolvedValue({
      ...post,
      title: 'title update',
    })
    const res = await updatePostResolver({
      id: post.id,
      user: createdUser,
      title: 'title update',
    })

    expect(res.title).toEqual('title update')
    expect(findPostSpy).toHaveBeenCalled()
    expect(updatePostSpy).toHaveBeenCalled()
  })
})

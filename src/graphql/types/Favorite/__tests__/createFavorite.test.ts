import { Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { postFactory, userFactory } from '../../../factories'
import * as favoriteResolver from '../resolver'
import { createFavoriteResolver } from '../resolver'

describe('createFavorite', () => {
  let user: User
  let createdPostUser: User
  let post: Post

  beforeAll(async () => {
    user = userFactory()
    createdPostUser = userFactory()
    post = postFactory({ createdUserId: createdPostUser.id })
  })

  const createFavoriteSpy = jest.spyOn(prismaMock.favorite, 'create')
  const findPostSpy = jest.spyOn(prismaMock.post, 'findUnique')
  const createNotificationSpy = jest.spyOn(favoriteResolver, 'createNotification')

  test('ログインユーザーが存在しない', async () => {
    try {
      await createFavoriteResolver({
        postId: post.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findPostSpy).not.toHaveBeenCalled()
    expect(createFavoriteSpy).not.toHaveBeenCalled()
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    try {
      await createFavoriteResolver({
        postId: 'postId',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿が存在しません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(createFavoriteSpy).not.toHaveBeenCalled()
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('ログインユーザーが投稿の作成者だった場合', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    await createFavoriteResolver({
      postId: post.id,
      user: createdPostUser,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createFavoriteSpy).toHaveBeenCalled()
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    await createFavoriteResolver({
      postId: post.id,
      user,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createFavoriteSpy).toHaveBeenCalled()
    expect(createNotificationSpy).toHaveBeenCalled()
  })
})

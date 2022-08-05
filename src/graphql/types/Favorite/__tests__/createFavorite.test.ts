import { Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createFavoriteResolver } from '../resolver'

describe('createFavorite', () => {
  let user: User
  let createdPostUser: User
  let post: Post

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    createdPostUser = await prisma.user.create({
      data: {
        name: 'createdPostUserName',
        email: 'createdPostUserEmail',
        image: 'createdPostUserImage',
      },
    })
    post = await prisma.post.create({
      data: {
        title: 'title',
        content: 'content',
        category: 'GIVE_ME',
        isPrivate: false,
        createdUserId: createdPostUser.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const createFavoriteSpy = jest.spyOn(prisma.favorite, 'create')
  const findPostSpy = jest.spyOn(prisma.post, 'findUnique')
  const createNotificationSpy = jest.spyOn(prisma.notification, 'create')

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
    await createFavoriteResolver({
      postId: post.id,
      user: createdPostUser,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createFavoriteSpy).toHaveBeenCalled()
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createFavoriteResolver({
      postId: post.id,
      user,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createFavoriteSpy).toHaveBeenCalled()
    expect(createNotificationSpy).toHaveBeenCalled()
  })
})

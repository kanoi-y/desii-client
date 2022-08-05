import { Favorite, Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteFavoriteResolver } from '../resolver'

describe('deleteFavorite', () => {
  let user: User
  let post: Post
  let favorite: Favorite & {
    createdUser: User
    post: Post
  }

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    post = await prisma.post.create({
      data: {
        title: 'title',
        content: 'content',
        category: 'GIVE_ME',
        isPrivate: false,
        createdUserId: user.id,
      },
    })
    favorite = await prisma.favorite.create({
      data: {
        createdUserId: user.id,
        postId: post.id,
      },
      include: {
        createdUser: true,
        post: true,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findFavoriteSpy = jest.spyOn(prisma.favorite, 'findUnique')
  const deleteFavoriteSpy = jest.spyOn(prisma.favorite, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteFavoriteResolver({
        postId: post.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findFavoriteSpy).not.toHaveBeenCalled()
    expect(deleteFavoriteSpy).not.toHaveBeenCalled()
  })

  test('favoriteが存在しない', async () => {
    try {
      await deleteFavoriteResolver({
        postId: 'postId',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('favoriteが存在しません'))
    }

    expect(findFavoriteSpy).toHaveBeenCalled()
    expect(deleteFavoriteSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteFavoriteResolver({
      postId: post.id,
      user,
    })

    expect(findFavoriteSpy).toHaveBeenCalled()
    expect(deleteFavoriteSpy).toHaveBeenCalled()
    expect(res).toEqual(favorite)
  })
})

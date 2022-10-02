import { Favorite, Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { favoriteFactory, postFactory, userFactory } from '../../../factories'
import { deleteFavoriteResolver } from '../resolver'

describe('deleteFavorite', () => {
  let user: User
  let post: Post
  let favorite: Favorite & {
    createdUser: User
    post: Post
  }

  beforeAll(async () => {
    user = userFactory()
    post = postFactory({ createdUserId: user.id })
    favorite = {
      ...favoriteFactory({
        createdUserId: user.id,
        postId: post.id,
      }),
      createdUser: user,
      post,
    }
  })

  const findFavoriteSpy = jest.spyOn(prismaMock.favorite, 'findUnique')
  const deleteFavoriteSpy = jest.spyOn(prismaMock.favorite, 'delete')

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
    prismaMock.favorite.findUnique.mockResolvedValue(null)
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
    prismaMock.favorite.findUnique.mockResolvedValue(favorite)
    prismaMock.favorite.delete.mockResolvedValue(favorite)
    const res = await deleteFavoriteResolver({
      postId: post.id,
      user,
    })

    expect(findFavoriteSpy).toHaveBeenCalled()
    expect(deleteFavoriteSpy).toHaveBeenCalled()
    expect(res).toEqual(favorite)
  })
})

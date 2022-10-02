import { Favorite, Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { favoriteFactory, postFactory, userFactory } from '../../../factories'
import { getFavoritesResolver } from '../resolver'

describe('getFavorites', () => {
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

  const spy = jest.spyOn(prismaMock.favorite, 'findMany')

  test('not found', async () => {
    prismaMock.favorite.findMany.mockResolvedValue([])
    const res = await getFavoritesResolver({
      sort: null,
      createdUserId: 'createdUserId',
      postId: 'postId',
    })

    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([])
  })

  test('成功', async () => {
    prismaMock.favorite.findMany.mockResolvedValue([favorite])
    const res = await getFavoritesResolver({
      sort: null,
      createdUserId: user.id,
      postId: post.id,
    })

    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([favorite])
  })
})

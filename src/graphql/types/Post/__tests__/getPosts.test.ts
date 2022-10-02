import { Favorite, Post, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { favoriteFactory, postFactory, userFactory } from '../../../factories'
import { getPostsResolver } from '../resolver'

describe('getPosts', () => {
  let user: User
  let post: Post
  let favoritePost: Post
  let favorite: Favorite

  beforeAll(async () => {
    user = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    favoritePost = postFactory({
      createdUserId: user.id,
    })
    favorite = favoriteFactory({
      createdUserId: user.id,
      postId: favoritePost.id,
    })
  })

  const countPostSpy = jest.spyOn(prismaMock.post, 'count')
  const findPostSpy = jest.spyOn(prismaMock.post, 'findMany')
  const findFavoriteSpy = jest.spyOn(prismaMock.favorite, 'findMany')

  test('sortがfavoriteで成功', async () => {
    prismaMock.post.count.mockResolvedValue(2)
    prismaMock.post.findMany.mockResolvedValue([post, favoritePost])
    prismaMock.favorite.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([favorite])
    const res = await getPostsResolver({
      sort: 'favorite',
      userId: user.id,
    })

    expect(res).toEqual({ count: 2, posts: [favoritePost, post] })
    expect(countPostSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(findFavoriteSpy).toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.count.mockResolvedValue(2)
    prismaMock.post.findMany.mockResolvedValue([post, favoritePost])
    const res = await getPostsResolver({
      sort: null,
      userId: user.id,
    })

    expect(res).toEqual({ count: 2, posts: [post, favoritePost] })
    expect(countPostSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(findFavoriteSpy).not.toHaveBeenCalled()
  })
})

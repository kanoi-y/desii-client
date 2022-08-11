import { Favorite, Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getPostsResolver } from '../resolver'

describe('getPosts', () => {
  let user: User
  let post: Post
  let favoritePost: Post

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
        bgImage: 'bgImage',
      },
    })
    favoritePost = await prisma.post.create({
      data: {
        title: 'title2',
        content: 'content2',
        category: 'GIVE_YOU',
        isPrivate: false,
        createdUserId: user.id,
        bgImage: 'bgImage2',
      },
    })
    await prisma.favorite.create({
      data: {
        createdUserId: user.id,
        postId: favoritePost.id,
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

  const countPostSpy = jest.spyOn(prisma.post, 'count')
  const findPostSpy = jest.spyOn(prisma.post, 'findMany')
  const findFavoriteSpy = jest.spyOn(prisma.favorite, 'findMany')

  test('sortがfavoriteで成功', async () => {
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

import { Favorite, Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getFavoritesResolver } from '../resolver'

// TODO: DBに接続してテストする
describe('getFavorites', () => {
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

  const spy = jest.spyOn(prisma.favorite, 'findMany')

  test('not found', async () => {
    const res = await getFavoritesResolver({
      sort: null,
      createdUserId: 'createdUserId',
      postId: 'postId',
    })

    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([])
  })

  test('成功', async () => {
    const res = await getFavoritesResolver({
      sort: null,
      createdUserId: user.id,
      postId: post.id,
    })

    expect(spy).toHaveBeenCalled()
    expect(res).toEqual([favorite])
  })
})

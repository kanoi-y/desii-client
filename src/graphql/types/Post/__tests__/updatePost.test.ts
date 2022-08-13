import { Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { updatePostResolver } from '../resolver'

describe('updatePost', () => {
  let user: User
  let createdUser: User
  let post: Post

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    createdUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
    post = await prisma.post.create({
      data: {
        title: 'title',
        content: 'content',
        category: 'GIVE_ME',
        isPrivate: false,
        createdUserId: createdUser.id,
        bgImage: 'bgImage',
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findPostSpy = jest.spyOn(prisma.post, 'findUnique')
  const updatePostSpy = jest.spyOn(prisma.post, 'update')

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

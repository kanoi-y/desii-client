import { Post, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deletePostResolver } from '../resolver'

describe('deletePost', () => {
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
  const deletePostSpy = jest.spyOn(prisma.post, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deletePostResolver({
        id: post.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findPostSpy).not.toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    try {
      await deletePostResolver({
        id: 'id',
        user: createdUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿が存在しません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('投稿は作成者しか削除できない', async () => {
    try {
      await deletePostResolver({
        id: post.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('投稿は作成者しか削除できません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await deletePostResolver({
      id: post.id,
      user: createdUser,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(deletePostSpy).toHaveBeenCalled()
  })
})

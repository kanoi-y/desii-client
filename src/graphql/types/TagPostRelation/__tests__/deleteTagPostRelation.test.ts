import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteTagPostRelationResolver } from '../resolver'

describe('deleteTagPostRelation', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let tag: Tag
  let tagPostRelation: TagPostRelation & {
    tag: Tag
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
    anotherUser = await prisma.user.create({
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
        createdUserId: user.id,
        bgImage: 'bgImage',
      },
    })
    tag = await prisma.tag.create({
      data: {
        name: 'tag',
      },
    })
    tagPostRelation = await prisma.tagPostRelation.create({
      data: {
        postId: post.id,
        tagId: tag.id,
      },
      include: {
        post: true,
        tag: true,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findTagPostRelationSpy = jest.spyOn(
    prisma.tagPostRelation,
    'findUnique'
  )
  const deleteTagPostRelationSpy = jest.spyOn(prisma.tagPostRelation, 'delete')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteTagPostRelationResolver({
        postId: post.id,
        tagId: tag.id,
        user: null,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findTagPostRelationSpy).not.toHaveBeenCalled()
    expect(deleteTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('tagPostRelationが存在しない', async () => {
    try {
      await deleteTagPostRelationResolver({
        postId: 'postId',
        tagId: tag.id,
        user,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('tagPostRelationが存在しません'))
    }

    expect(findTagPostRelationSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('作成者しかタグを削除できない', async () => {
    try {
      await deleteTagPostRelationResolver({
        postId: post.id,
        tagId: tag.id,
        user: anotherUser,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('作成者しかタグを削除できません'))
    }

    expect(findTagPostRelationSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteTagPostRelationResolver({
      postId: post.id,
      tagId: tag.id,
      user,
    })

    expect(res).toEqual(tagPostRelation)
    expect(findTagPostRelationSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationSpy).toHaveBeenCalled()
  })
})

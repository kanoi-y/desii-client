import { Post, Tag, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createTagPostRelationResolver } from '../resolver'

describe('createTagPostRelation', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let tag: Tag

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
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findTagSpy = jest.spyOn(prisma.tag, 'findUnique')
  const findPostSpy = jest.spyOn(prisma.post, 'findUnique')
  const createTagPostRelationSpy = jest.spyOn(prisma.tagPostRelation, 'create')

  test('ログインユーザーが存在しない', async () => {
    try {
      await createTagPostRelationResolver({
        postId: post.id,
        tagId: tag.id,
        user: null,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findTagSpy).not.toHaveBeenCalled()
    expect(findPostSpy).not.toHaveBeenCalled()
    expect(createTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('タグ、または投稿が存在しない', async () => {
    try {
      await createTagPostRelationResolver({
        postId: 'id',
        tagId: tag.id,
        user,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('タグ、または投稿が存在しません'))
    }

    expect(findTagSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('作成者しかタグを追加できない', async () => {
    try {
      await createTagPostRelationResolver({
        postId: post.id,
        tagId: tag.id,
        user: anotherUser,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('作成者しかタグを追加できません'))
    }

    expect(findTagSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createTagPostRelationResolver({
      postId: post.id,
      tagId: tag.id,
      user,
    })

    expect(findTagSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationSpy).toHaveBeenCalled()
  })
})

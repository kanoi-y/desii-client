import { Post, Tag, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createTagPostRelationsResolver } from '../resolver'

describe('createTagPostRelations', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let tag: Tag
  let anotherTag: Tag

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
    anotherTag = await prisma.tag.create({
      data: {
        name: 'anotherTag',
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findPostSpy = jest.spyOn(prisma.post, 'findUnique')
  const createTagPostRelationsSpy = jest.spyOn(prisma.tagPostRelation, 'createMany')
  const findTagPostRelationsSpy = jest.spyOn(prisma.tagPostRelation, 'findMany')

  test('ログインユーザーが存在しない', async () => {
    try {
      await createTagPostRelationsResolver({
        postId: post.id,
        tagIds: [tag.id, anotherTag.id],
        user: null,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findPostSpy).not.toHaveBeenCalled()
    expect(createTagPostRelationsSpy).not.toHaveBeenCalled()
    expect(findTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    try {
      await createTagPostRelationsResolver({
        postId: 'postId',
        tagIds: [tag.id, anotherTag.id],
        user,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('投稿が存在しません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationsSpy).not.toHaveBeenCalled()
    expect(findTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('投稿の作成者しかタグを追加できない', async () => {
    try {
      await createTagPostRelationsResolver({
        postId: post.id,
        tagIds: [tag.id, anotherTag.id],
        user: anotherUser,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('投稿の作成者しかタグを追加できません'))
    }

    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationsSpy).not.toHaveBeenCalled()
    expect(findTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    await createTagPostRelationsResolver({
      postId: post.id,
      tagIds: [tag.id, anotherTag.id],
      user,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationsSpy).toHaveBeenCalled()
    expect(findTagPostRelationsSpy).toHaveBeenCalled()
  })
})

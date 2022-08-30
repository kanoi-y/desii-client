import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { deleteTagPostRelationsResolver } from '../resolver'

describe('deleteTagPostRelations', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let anotherPost: Post
  let tag: Tag
  let anotherTag: Tag
  let tagPostRelation: TagPostRelation & {
    tag: Tag
    post: Post
  }
  let anotherTagPostRelation: TagPostRelation & {
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
    anotherPost = await prisma.post.create({
      data: {
        title: 'title2',
        content: 'content2',
        category: 'GIVE_YOU',
        isPrivate: false,
        createdUserId: user.id,
        bgImage: 'bgImage2',
      },
    })
    tag = await prisma.tag.create({
      data: {
        name: 'tag',
      },
    })
    anotherTag = await prisma.tag.create({
      data: {
        name: 'tag2',
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
    anotherTagPostRelation = await prisma.tagPostRelation.create({
      data: {
        postId: anotherPost.id,
        tagId: anotherTag.id,
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

  const findTagPostRelationsSpy = jest.spyOn(
    prisma.tagPostRelation,
    'findMany'
  )
  const deleteTagPostRelationsSpy = jest.spyOn(prisma.tagPostRelation, 'deleteMany')

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [{ postId: post.id, tagId: tag.id }, { postId: anotherPost.id, tagId: anotherTag.id }],
        user: null,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findTagPostRelationsSpy).not.toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('tagPostRelationが存在しない', async () => {
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [{ postId: 'postId', tagId: 'tagId' }, { postId: 'anotherPostId', tagId: 'anotherTagId' }],
        user,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('tagPostRelationが存在しません'))
    }

    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('作成者しかタグを削除できない', async () => {
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [{ postId: post.id, tagId: tag.id }, { postId: anotherPost.id, tagId: anotherTag.id }],
        user: anotherUser,
      })
  
    } catch (e) {
      expect(e).toEqual(new Error('作成者しかタグを削除できません'))
    }

    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await deleteTagPostRelationsResolver({
      tagPostTypes: [{ postId: post.id, tagId: tag.id }, { postId: anotherPost.id, tagId: anotherTag.id }],
      user,
    })

    expect(res).toContainEqual(tagPostRelation)
    expect(res).toContainEqual(anotherTagPostRelation)
    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).toHaveBeenCalled()
  })
})

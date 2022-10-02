import { Post, Tag, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  postFactory,
  tagFactory,
  tagPostRelationFactory,
  userFactory,
} from '../../../factories'
import { createTagPostRelationResolver } from '../resolver'

describe('createTagPostRelation', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let tag: Tag

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    tag = tagFactory()
  })

  const findTagSpy = jest.spyOn(prismaMock.tag, 'findUnique')
  const findPostSpy = jest.spyOn(prismaMock.post, 'findUnique')
  const createTagPostRelationSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'create'
  )

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
    prismaMock.tag.findUnique.mockResolvedValue(tag)
    prismaMock.post.findUnique.mockResolvedValue(null)
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
    prismaMock.tag.findUnique.mockResolvedValue(tag)
    prismaMock.post.findUnique.mockResolvedValue(post)
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
    prismaMock.tag.findUnique.mockResolvedValue(tag)
    prismaMock.post.findUnique.mockResolvedValue(post)
    prismaMock.tagPostRelation.create.mockResolvedValue(
      tagPostRelationFactory({
        tagId: tag.id,
        postId: post.id,
      })
    )
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

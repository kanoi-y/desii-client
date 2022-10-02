import { Post, Tag, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  postFactory,
  tagFactory,
  tagPostRelationFactory,
  userFactory,
} from '../../../factories'
import * as resolver from '../resolver'
import { createTagPostRelationsResolver } from '../resolver'

describe('createTagPostRelations', () => {
  let user: User
  let anotherUser: User
  let post: Post
  let tag: Tag
  let anotherTag: Tag

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    tag = tagFactory()
    anotherTag = tagFactory()
  })

  const findPostSpy = jest.spyOn(prismaMock.post, 'findUnique')
  const createTagPostRelationsSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'createMany'
  )
  const findTagPostRelationsSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'findMany'
  )
  const createNotificationSpy = jest
    .spyOn(resolver, 'createNotification')
    .mockResolvedValue(void 0)

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
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('投稿が存在しない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
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
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('投稿の作成者しかタグを追加できない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
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
    expect(createNotificationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    prismaMock.tagPostRelation.createMany.mockResolvedValue({ count: 2 })
    prismaMock.tagPostRelation.findMany.mockResolvedValue([
      tagPostRelationFactory({
        postId: post.id,
        tagId: tag.id,
      }),
      tagPostRelationFactory({
        postId: post.id,
        tagId: anotherTag.id,
      }),
    ])
    await createTagPostRelationsResolver({
      postId: post.id,
      tagIds: [tag.id, anotherTag.id],
      user,
    })

    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationsSpy).toHaveBeenCalled()
    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(createNotificationSpy).toHaveBeenCalled()
  })
})

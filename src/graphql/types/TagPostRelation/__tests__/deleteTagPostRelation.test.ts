import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  postFactory,
  tagFactory,
  tagPostRelationFactory,
  userFactory,
} from '../../../factories'
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
    user = userFactory()
    anotherUser = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    tag = tagFactory()
    tagPostRelation = {
      ...tagPostRelationFactory({
        postId: post.id,
        tagId: tag.id,
      }),
      post,
      tag,
    }
  })

  const findTagPostRelationSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'findUnique'
  )
  const deleteTagPostRelationSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'delete'
  )

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
    prismaMock.tagPostRelation.findUnique.mockResolvedValue(null)
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
    prismaMock.tagPostRelation.findUnique.mockResolvedValue(tagPostRelation)
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
    prismaMock.tagPostRelation.findUnique.mockResolvedValue(tagPostRelation)
    prismaMock.tagPostRelation.delete.mockResolvedValue(tagPostRelation)
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

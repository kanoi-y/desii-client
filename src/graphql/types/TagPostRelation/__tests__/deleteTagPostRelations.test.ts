import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  postFactory,
  tagFactory,
  tagPostRelationFactory,
  userFactory,
} from '../../../factories'
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
    user = userFactory()
    anotherUser = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    anotherPost = postFactory({
      createdUserId: user.id,
    })
    tag = tagFactory()
    anotherTag = tagFactory()
    tagPostRelation = {
      ...tagPostRelationFactory({
        postId: post.id,
        tagId: tag.id,
      }),
      tag,
      post,
    }
    anotherTagPostRelation = {
      ...tagPostRelationFactory({
        postId: anotherPost.id,
        tagId: anotherTag.id,
      }),
      tag,
      post,
    }
  })

  const findTagPostRelationsSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'findMany'
  )
  const deleteTagPostRelationsSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'deleteMany'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [
          { postId: post.id, tagId: tag.id },
          { postId: anotherPost.id, tagId: anotherTag.id },
        ],
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findTagPostRelationsSpy).not.toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('tagPostRelationが存在しない', async () => {
    prismaMock.tagPostRelation.findMany.mockResolvedValue([])
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [
          { postId: 'postId', tagId: 'tagId' },
          { postId: 'anotherPostId', tagId: 'anotherTagId' },
        ],
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('tagPostRelationが存在しません'))
    }

    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('作成者しかタグを削除できない', async () => {
    prismaMock.tagPostRelation.findMany.mockResolvedValue([tagPostRelation, anotherTagPostRelation])
    try {
      await deleteTagPostRelationsResolver({
        tagPostTypes: [
          { postId: post.id, tagId: tag.id },
          { postId: anotherPost.id, tagId: anotherTag.id },
        ],
        user: anotherUser,
      })
    } catch (e) {
      expect(e).toEqual(new Error('作成者しかタグを削除できません'))
    }

    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.tagPostRelation.findMany.mockResolvedValue([tagPostRelation, anotherTagPostRelation])
    prismaMock.tagPostRelation.deleteMany.mockResolvedValue({ count: 2})
    const res = await deleteTagPostRelationsResolver({
      tagPostTypes: [
        { postId: post.id, tagId: tag.id },
        { postId: anotherPost.id, tagId: anotherTag.id },
      ],
      user,
    })

    expect(res).toContainEqual(tagPostRelation)
    expect(res).toContainEqual(anotherTagPostRelation)
    expect(findTagPostRelationsSpy).toHaveBeenCalled()
    expect(deleteTagPostRelationsSpy).toHaveBeenCalled()
  })
})

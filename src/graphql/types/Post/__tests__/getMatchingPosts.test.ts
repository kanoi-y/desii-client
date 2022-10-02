import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  postFactory,
  tagFactory,
  tagPostRelationFactory,
  userFactory,
} from '../../../factories'
import * as logics from '../../../logics'
import { getMatchingPostsResolver } from '../resolver'

describe('getMatchingPosts', () => {
  let user: User
  let matchingUser: User
  let post: Post
  let matchingPost: Post
  let tag: Tag
  let tagPostRelation: TagPostRelation
  let tagMatchingPostRelation: TagPostRelation

  beforeAll(async () => {
    user = userFactory()
    matchingUser = userFactory()
    post = postFactory({
      createdUserId: user.id,
    })
    matchingPost = postFactory({
      createdUserId: matchingUser.id,
    })
    tag = tagFactory()
    tagPostRelation = tagPostRelationFactory({
      tagId: tag.id,
      postId: post.id,
    })
    tagMatchingPostRelation = tagPostRelationFactory({
      tagId: tag.id,
      postId: matchingPost.id,
    })
  })

  const findUniquePostSpy = jest.spyOn(prismaMock.post, 'findUnique')
  const findTagPostRelationSpy = jest.spyOn(
    prismaMock.tagPostRelation,
    'findMany'
  )
  const matchPostsSpy = jest.spyOn(logics, 'matchPosts')

  test('ログインユーザーが存在しない', async () => {
    try {
      await getMatchingPostsResolver({
        postId: post.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUniquePostSpy).not.toHaveBeenCalled()
    expect(findTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('対象の投稿が存在しない', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    try {
      await getMatchingPostsResolver({
        postId: 'postId',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('対象の投稿が存在しません'))
    }

    expect(findUniquePostSpy).toHaveBeenCalled()
    expect(findTagPostRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    prismaMock.tagPostRelation.findMany.mockResolvedValue([tagPostRelation])
    matchPostsSpy.mockResolvedValue([{ count: 1, post: matchingPost }])
    const res = await getMatchingPostsResolver({
      postId: post.id,
      user,
    })

    expect(res).toEqual([{ count: 1, post: matchingPost }])
    expect(findUniquePostSpy).toHaveBeenCalled()
    expect(findTagPostRelationSpy).toHaveBeenCalled()
  })
})

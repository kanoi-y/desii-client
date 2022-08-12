import { Post, Tag, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getMatchingPostsResolver } from '../resolver'

describe('getMatchingPosts', () => {
  let user: User
  let matchingUser: User
  let post: Post
  let matchingPost: Post
  let tag: Tag

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    matchingUser = await prisma.user.create({
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
    matchingPost = await prisma.post.create({
      data: {
        title: 'title2',
        content: 'content2',
        category: 'GIVE_YOU',
        isPrivate: false,
        createdUserId: matchingUser.id,
        bgImage: 'bgImage2',
      },
    })
    tag = await prisma.tag.create({
      data: {
        name: 'tag',
      },
    })
    await prisma.tagPostRelation.create({
      data: {
        tagId: tag.id,
        postId: post.id,
      },
    })
    await prisma.tagPostRelation.create({
      data: {
        tagId: tag.id,
        postId: matchingPost.id,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findUniquePostSpy = jest.spyOn(prisma.post, 'findUnique')
  const findTagPostRelationSpy = jest.spyOn(prisma.tagPostRelation, 'findMany')

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
    const res = await getMatchingPostsResolver({
      postId: post.id,
      user,
    })

    expect(res).toEqual([{ count: 1, post: matchingPost }])
    expect(findUniquePostSpy).toHaveBeenCalled()
    expect(findTagPostRelationSpy).toHaveBeenCalled()
  })
})

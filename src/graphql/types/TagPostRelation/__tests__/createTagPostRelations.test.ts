import { Post, Tag, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createTagPostRelationsResolver } from '../resolver'

describe('createTagPostRelations', () => {
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

  test('成功', async () => {
    await createTagPostRelationsResolver({
      postId: post.id,
      tagId: tag.id,
      user,
    })

    expect(findTagSpy).toHaveBeenCalled()
    expect(findPostSpy).toHaveBeenCalled()
    expect(createTagPostRelationSpy).toHaveBeenCalled()
  })
})

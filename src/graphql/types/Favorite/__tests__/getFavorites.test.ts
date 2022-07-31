import { Favorite, Post, PostCategory, User } from '@prisma/client'
import { Context, createMockContext, MockContext } from '../../../context'
import { getFavoritesResolver } from '../resolver'

describe('getFavorites', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  test('成功', async () => {
    const favorite: Favorite & {
      post: Post
      createdUser: User
    } = {
      id: 'favoriteId',
      createdUserId: 'userId',
      postId: 'postId',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdUser: {
        id: 'userId',
        name: 'userName',
        description: 'description',
        email: 'email',
        image: 'image',
        accessToken: 'accessToken',
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      post: {
        id: 'postId',
        title: 'title',
        content: 'content',
        category: 'GIVE_ME' as PostCategory,
        createdUserId: 'createdUserId',
        isPrivate: false,
        groupId: 'groupId',
        bgImage: 'images/Desii_bgImage.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
    mockCtx.prisma.favorite.findMany.mockResolvedValue([favorite])

    await expect(
      getFavoritesResolver(
        {},
        { createdUserId: 'userId', postId: 'postId', sort: 'desc' },
        ctx
      )
    ).resolves.toEqual([favorite])
  })
})

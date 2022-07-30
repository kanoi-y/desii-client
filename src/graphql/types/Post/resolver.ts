import { Post as PostType, UserGroupRelation } from '@prisma/client'
import { matchPosts } from '~/graphql/logics'
import { Context } from '../../context'

export const getPostResolver = (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  return ctx.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  })
}

export const getPostsResolver = async (
  _parent: {},
  args: {
    category?: 'GIVE_ME' | 'GIVE_YOU' | null
    groupId?: string | null
    isPrivate?: boolean | null
    searchText?: string | null
    skip?: number | null
    sort: 'asc' | 'desc' | 'favorite' | null
    take?: number | null
    userId?: string | null
  },
  ctx: Context
) => {
  const query: Partial<PostType> = {}
  if (args.userId) query.createdUserId = args.userId
  if (args.groupId) query.groupId = args.groupId
  if (args.category) query.category = args.category
  if (typeof args.isPrivate === 'boolean') {
    query.isPrivate = args.isPrivate
  }

  const postsCount = await ctx.prisma.post.count({
    where: {
      ...query,
      OR: [
        {
          title: {
            contains: args.searchText || '',
          },
        },
        {
          content: {
            contains: args.searchText || '',
          },
        },
      ],
    },
  })

  const posts = await ctx.prisma.post.findMany({
    where: {
      ...query,
      OR: [
        {
          title: {
            contains: args.searchText || '',
          },
        },
        {
          content: {
            contains: args.searchText || '',
          },
        },
      ],
    },
    skip: args.skip || undefined,
    take: args.take || undefined,
    orderBy: {
      createdAt: args.sort === 'favorite' ? 'desc' : args.sort || 'asc',
    },
  })

  if (args.sort !== 'favorite') return { count: postsCount, posts }

  const favoritePosts = (
    await Promise.all(
      posts.map(async (post: PostType) => {
        const favorites = await ctx.prisma.favorite.findMany({
          where: {
            postId: post.id,
          },
        })

        return { ...post, count: favorites.length }
      })
    )
  )
    .sort((a, b) => b.count - a.count)
    .map((postWithCount) => {
      const { count, ...post } = postWithCount
      return post
    })

  return { count: postsCount, posts: favoritePosts }
}

export const getMatchingPostsResolver = async (
  _parent: {},
  args: {
    postId: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const targetPost = await ctx.prisma.post.findUnique({
    where: {
      id: args.postId,
    },
  })

  if (!targetPost) {
    throw new Error('対象の投稿が存在しません')
  }

  const tagPostRelations = await ctx.prisma.tagPostRelation.findMany({
    where: {
      postId: args.postId,
    },
    include: {
      tag: true,
      post: true,
    },
  })

  const matchingPostsInfo = await matchPosts(ctx, tagPostRelations, targetPost)

  return matchingPostsInfo.sort((a, b) => b.count - a.count)
}

export const createPostResolver = async (
  _parent: {},
  args: {
    bgImage?: string | null
    category: 'GIVE_ME' | 'GIVE_YOU'
    content: string
    groupId?: string | null
    isPrivate: boolean
    title: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  if (args.groupId) {
    const userGroupRelations = await ctx.prisma.userGroupRelation.findMany({
      where: {
        userId: ctx.user.id,
      },
    })
    const joinedGroupIds = userGroupRelations.map(
      (userGroupRelation: UserGroupRelation) => userGroupRelation.groupId
    )
    if (!joinedGroupIds.includes(args.groupId)) {
      throw new Error('グループに所属していないユーザーは作成できません')
    }
  }

  return ctx.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      category: args.category,
      isPrivate: args.isPrivate,
      createdUserId: ctx.user.id,
      groupId: args.groupId,
      bgImage: args.bgImage,
    },
  })
}

export const deletePostResolver = async (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await ctx.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (ctx.user.id !== post.createdUserId) {
    throw new Error('投稿は作成者しか削除できません')
  }
  return ctx.prisma.post.delete({
    where: {
      id: args.id,
    },
  })
}

export const updatePostResolver = async (
  _parent: {},
  args: {
    bgImage?: string | null
    category?: 'GIVE_ME' | 'GIVE_YOU' | null
    content?: string | null
    id: string
    isPrivate?: boolean | null
    title?: string | null
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await ctx.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (ctx.user.id !== post.createdUserId) {
    throw new Error('投稿は作成者しか更新できません')
  }

  const updatePost = {
    title: args.title || post.title,
    content: args.content || post.content,
    category: args.category || post.category,
    isPrivate: args.isPrivate || post.isPrivate,
    bgImage: args.bgImage || post.bgImage,
  }

  return ctx.prisma.post.update({
    where: {
      id: args.id,
    },
    data: updatePost,
  })
}

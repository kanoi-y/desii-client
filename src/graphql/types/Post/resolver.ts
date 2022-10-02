import { Post as PostType, User, UserGroupRelation } from '@prisma/client'
import { matchPosts } from '../../logics'
import { prisma } from '../../../lib/prisma'

export const getPostResolver = ({ id }: { id: string }) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  })
}

export const getPostsResolver = async ({
  category,
  groupId,
  isPrivate,
  searchText,
  skip,
  sort,
  take,
  userId,
}: {
  category?: 'GIVE_ME' | 'GIVE_YOU' | null
  groupId?: string | null
  isPrivate?: boolean | null
  searchText?: string | null
  skip?: number | null
  sort: 'asc' | 'desc' | 'favorite' | null
  take?: number | null
  userId?: string | null
}) => {
  const query: Partial<PostType> = {}
  if (userId) query.createdUserId = userId
  if (groupId) query.groupId = groupId
  if (category) query.category = category
  if (typeof isPrivate === 'boolean') {
    query.isPrivate = isPrivate
  }

  const postsCount = await prisma.post.count({
    where: {
      ...query,
      OR: [
        {
          title: {
            contains: searchText || '',
          },
        },
        {
          content: {
            contains: searchText || '',
          },
        },
      ],
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      ...query,
      OR: [
        {
          title: {
            contains: searchText || '',
          },
        },
        {
          content: {
            contains: searchText || '',
          },
        },
      ],
    },
    skip: skip || undefined,
    take: take || undefined,
    orderBy: {
      createdAt: sort === 'favorite' ? 'desc' : sort || 'asc',
    },
  })

  if (sort !== 'favorite') return { count: postsCount, posts }

  const favoritePosts = (
    await Promise.all(
      posts.map(async (post: PostType) => {
        const favorites = await prisma.favorite.findMany({
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

export const getMatchingPostsResolver = async ({
  postId,
  user,
}: {
  postId: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const targetPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!targetPost) {
    throw new Error('対象の投稿が存在しません')
  }

  const tagPostRelations = await prisma.tagPostRelation.findMany({
    where: {
      postId,
    },
    include: {
      tag: true,
      post: true,
    },
  })

  const matchingPostsInfo = await matchPosts(tagPostRelations, targetPost, user)

  return matchingPostsInfo.sort((a, b) => b.count - a.count)
}

export const createPostResolver = async ({
  bgImage,
  category,
  content,
  groupId,
  isPrivate,
  title,
  user,
}: {
  bgImage?: string | null
  category: 'GIVE_ME' | 'GIVE_YOU'
  content: string
  groupId?: string | null
  isPrivate: boolean
  title: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  if (groupId) {
    const userGroupRelations = await prisma.userGroupRelation.findMany({
      where: {
        userId: user.id,
      },
    })
    const joinedGroupIds = userGroupRelations.map(
      (userGroupRelation: UserGroupRelation) => userGroupRelation.groupId
    )
    if (!joinedGroupIds.includes(groupId)) {
      throw new Error('グループに所属していないユーザーは作成できません')
    }
  }

  return prisma.post.create({
    data: {
      title,
      content,
      category,
      isPrivate,
      createdUserId: user.id,
      groupId,
      bgImage,
    },
  })
}

export const deletePostResolver = async ({
  id,
  user,
}: {
  id: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (user.id !== post.createdUserId) {
    throw new Error('投稿は作成者しか削除できません')
  }
  return prisma.post.delete({
    where: {
      id,
    },
  })
}

export const updatePostResolver = async ({
  bgImage,
  category,
  content,
  id,
  isPrivate,
  title,
  user,
}: {
  bgImage?: string | null
  category?: 'GIVE_ME' | 'GIVE_YOU' | null
  content?: string | null
  id: string
  isPrivate?: boolean | null
  title?: string | null
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    throw new Error('投稿が存在しません')
  }

  if (user.id !== post.createdUserId) {
    throw new Error('投稿は作成者しか更新できません')
  }

  const updatePost = {
    title: title || post.title,
    content: content || post.content,
    category: category || post.category,
    isPrivate: isPrivate || post.isPrivate,
    bgImage: bgImage || post.bgImage,
  }

  return prisma.post.update({
    where: {
      id,
    },
    data: updatePost,
  })
}

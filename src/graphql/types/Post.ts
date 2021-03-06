import { Post as PostType, UserGroupRelation } from '@prisma/client'
import {
  arg,
  booleanArg,
  enumType,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { matchPosts } from '~/graphql/logics'

export const PostCategory = enumType({
  name: 'PostCategory',
  members: ['GIVE_ME', 'GIVE_YOU'],
})

export const OrderByType = enumType({
  name: 'orderByType',
  members: ['asc', 'desc'],
})

export const PostOrderByType = enumType({
  name: 'postOrderByType',
  members: ['asc', 'desc', 'favorite'],
})

export const MatchingPostInfoType = objectType({
  name: 'MatchingPostInfoType',
  definition(t) {
    t.nonNull.int('count')
    t.nonNull.field('post', {
      type: 'Post',
    })
  },
})

export const PostsWithCountType = objectType({
  name: 'PostsWithCountType',
  definition(t) {
    t.nonNull.int('count')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
    })
  },
})

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.field('category', {
      type: 'PostCategory',
    })
    t.nonNull.string('createdUserId')
    t.nonNull.boolean('isPrivate')
    t.string('groupId')
    t.string('bgImage')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetPostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getPost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

export const GetPostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetPosts', {
      type: 'PostsWithCountType',
      args: {
        userId: stringArg(),
        groupId: stringArg(),
        category: arg({
          type: PostCategory,
        }),
        isPrivate: booleanArg(),
        sort: arg({
          type: PostOrderByType,
          default: 'asc',
        }),
        take: intArg(),
        skip: intArg(),
        searchText: stringArg(),
      },
      async resolve(_parent, args, ctx) {
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
      },
    })
  },
})

export const GetMatchingPostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetMatchingPosts', {
      type: 'MatchingPostInfoType',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('?????????????????????????????????????????????')
        }

        const targetPost = await ctx.prisma.post.findUnique({
          where: {
            id: args.postId,
          },
        })

        if (!targetPost) {
          throw new Error('????????????????????????????????????')
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

        const matchingPostsInfo = await matchPosts(
          ctx,
          tagPostRelations,
          targetPost
        )

        return matchingPostsInfo.sort((a, b) => b.count - a.count)
      },
    })
  },
})

export const CreatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        category: nonNull(PostCategory),
        isPrivate: nonNull(booleanArg()),
        groupId: stringArg(),
        bgImage: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('?????????????????????????????????????????????')
        }

        if (args.groupId) {
          const userGroupRelations =
            await ctx.prisma.userGroupRelation.findMany({
              where: {
                userId: ctx.user.id,
              },
            })
          const joinedGroupIds = userGroupRelations.map(
            (userGroupRelation: UserGroupRelation) => userGroupRelation.groupId
          )
          if (!joinedGroupIds.includes(args.groupId)) {
            throw new Error('????????????????????????????????????????????????????????????????????????')
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
      },
    })
  },
})

export const DeletePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('?????????????????????????????????????????????')
        }

        const post = await ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!post) {
          throw new Error('???????????????????????????')
        }

        if (ctx.user.id !== post.createdUserId) {
          throw new Error('?????????????????????????????????????????????')
        }
        return ctx.prisma.post.delete({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

export const UpdatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        content: stringArg(),
        category: PostCategory,
        isPrivate: booleanArg(),
        bgImage: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('?????????????????????????????????????????????')
        }

        const post = await ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!post) {
          throw new Error('???????????????????????????')
        }

        if (ctx.user.id !== post.createdUserId) {
          throw new Error('?????????????????????????????????????????????')
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
      },
    })
  },
})

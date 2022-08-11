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
import {
  createPostResolver,
  deletePostResolver,
  getMatchingPostsResolver,
  getPostResolver,
  getPostsResolver,
  updatePostResolver,
} from './resolver'

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
      resolve(_parent, args, _ctx) {
        return getPostResolver({
          id: args.id,
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
      resolve(_parent, args, _ctx) {
        return getPostsResolver({
          userId: args.userId,
          groupId: args.groupId,
          category: args.category,
          isPrivate: args.isPrivate,
          sort: args.sort,
          take: args.take,
          skip: args.skip,
          searchText: args.searchText,
        })
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
      resolve(_parent, args, ctx) {
        return getMatchingPostsResolver({
          postId: args.postId,
          user: ctx.user,
        })
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
      resolve(_parent, args, ctx) {
        return createPostResolver({
          title: args.title,
          content: args.content,
          category: args.category,
          isPrivate: args.isPrivate,
          groupId: args.groupId,
          bgImage: args.bgImage,
          user: ctx.user,
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
      resolve(_parent, args, ctx) {
        return deletePostResolver({
          id: args.id,
          user: ctx.user,
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
      resolve(_parent, args, ctx) {
        return updatePostResolver({
          id: args.id,
          title: args.title,
          content: args.content,
          category: args.category,
          isPrivate: args.isPrivate,
          bgImage: args.bgImage,
          user: ctx.user,
        })
      },
    })
  },
})

import { Post as PostType } from '@prisma/client'
import {
  booleanArg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'

export const PostCategory = enumType({
  name: 'PostCategory',
  members: ['GIVE_ME', 'GIVE_YOU'],
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
    t.nonNull.list.nonNull.field('GetPosts', {
      type: 'Post',
      args: {
        userId: stringArg(),
        groupId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        const query: Partial<PostType> = {}
        if (args.userId) query.createdUserId = args.userId
        if (args.groupId) query.groupId = args.groupId

        return ctx.prisma.post.findMany({
          where: query,
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
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        if (args.groupId) {
          const userGroupRelations =
            await ctx.prisma.userGroupRelation.findMany({
              where: {
                userId: ctx.user.id,
              },
            })
          const joinedGroupIds = userGroupRelations.map(
            (userGroupRelation) => userGroupRelation.groupId
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
      },
      async resolve(_parent, args, ctx) {
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

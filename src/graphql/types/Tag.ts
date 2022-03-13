import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetAllTagsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getAllTags', {
      type: 'Tag',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.tag.findMany()
      },
    })
  },
})

export const GetTagByNameQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetTagByName', {
      type: 'Tag',
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.tag.findUnique({
          where: {
            name: args.name,
          },
        })
      },
    })
  },
})

export const CreateTagMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTag', {
      type: 'Tag',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        return ctx.prisma.tag.create({
          data: {
            name: args.name,
          },
        })
      },
    })
  },
})

// FIXME: deleteが必要になれば実装する

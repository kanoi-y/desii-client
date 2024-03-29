import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'
import { OrderByType } from '../Post'
import {
  createTagResolver,
  getAllTagsResolver,
  getTagByNameResolver,
} from './resolver'

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
      args: {
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
        searchText: stringArg(),
      },
      resolve(_parent, args, _ctx) {
        return getAllTagsResolver({
          sort: args.sort,
          searchText: args.searchText,
        })
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
      resolve(_parent, args, _ctx) {
        return getTagByNameResolver({
          name: args.name,
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
      resolve(_parent, args, ctx) {
        return createTagResolver({
          name: args.name,
          user: ctx.user,
        })
      },
    })
  },
})

// FIXME: deleteが必要になれば実装する

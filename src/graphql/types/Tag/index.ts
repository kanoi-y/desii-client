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
      resolve: getAllTagsResolver,
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
      resolve: getTagByNameResolver,
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
      resolve: createTagResolver,
    })
  },
})

// FIXME: deleteが必要になれば実装する

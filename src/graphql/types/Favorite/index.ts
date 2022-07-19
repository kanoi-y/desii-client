import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'
import { OrderByType } from '../Post'
import {
  createFavoriteResolver,
  deleteFavoriteResolver,
  getFavoritesResolver,
} from './resolver'

export const Favorite = objectType({
  name: 'Favorite',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('createdUserId')
    t.nonNull.string('postId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('createdUser', {
      type: 'User',
    })
    t.nonNull.field('post', {
      type: 'Post',
    })
  },
})

export const GetFavoritesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetFavorites', {
      type: 'Favorite',
      args: {
        createdUserId: stringArg(),
        postId: stringArg(),
        sort: arg({
          type: OrderByType,
          default: 'asc',
        }),
      },
      resolve: getFavoritesResolver,
    })
  },
})

export const CreateFavoriteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createFavorite', {
      type: 'Favorite',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: createFavoriteResolver,
    })
  },
})

export const DeleteFavoriteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteFavorite', {
      type: 'Favorite',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: deleteFavoriteResolver,
    })
  },
})

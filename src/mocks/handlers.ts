import { graphql } from 'msw'
import { getFavorites, getUser, getUserGroupRelations } from './api'
import { favoriteFactory } from './factories'

export const handlers = [
  graphql.query('GetUserGroupRelations', getUserGroupRelations),
  graphql.query('GetUser', getUser),
  graphql.query('GetFavorites', getFavorites),
  graphql.mutation('CreateFavorite', (req, res, ctx) => {
    const { postId } = req.variables
    return res(
      ctx.data({
        createFavorite: {
          ...favoriteFactory({ postId }),
        },
      })
    )
  }),
  graphql.mutation('DeleteFavorite', (req, res, ctx) => {
    const { postId } = req.variables
    return res(
      ctx.data({
        DeleteFavorite: {
          ...favoriteFactory({ postId }),
        },
      })
    )
  }),
]

import { graphql } from 'msw'
import { getUser, getUserGroupRelations } from './api'
import { favoriteFactory } from './factories'

export const handlers = [
  graphql.query('GetUserGroupRelations', getUserGroupRelations),
  graphql.query('GetUser', getUser),
  graphql.query('GetFavorites', (req, res, ctx) => {
    const { postId } = req.variables
    return res(
      ctx.data({
        GetFavorites: [
          {
            ...favoriteFactory({ postId }),
          },
        ],
      })
    )
  }),
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

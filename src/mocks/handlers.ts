import { graphql } from 'msw'
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  getUser,
  getUserGroupRelations,
} from './api'

export const handlers = [
  graphql.query('GetUserGroupRelations', getUserGroupRelations),
  graphql.query('GetUser', getUser),
  graphql.query('GetFavorites', getFavorites),
  graphql.mutation('CreateFavorite', createFavorite),
  graphql.mutation('DeleteFavorite', deleteFavorite),
]

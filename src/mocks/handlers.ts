import { graphql } from 'msw'
import {
  createFavorite,
  deleteFavorite,
  getAllTags,
  getFavorites,
  getUser,
  getUserGroupRelations,
} from './api'

export const handlers = [
  graphql.query('GetUserGroupRelations', getUserGroupRelations),
  graphql.query('GetUser', getUser),
  graphql.query('GetFavorites', getFavorites),
  graphql.query('GetAllTags', getAllTags),
  graphql.mutation('CreateFavorite', createFavorite),
  graphql.mutation('DeleteFavorite', deleteFavorite),
]

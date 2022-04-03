import { graphql } from 'msw'
import {
  createFavorite,
  createTag,
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
  graphql.mutation('CreateTag', createTag),
  graphql.mutation('DeleteFavorite', deleteFavorite),
]

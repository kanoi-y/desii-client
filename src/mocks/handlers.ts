import { graphql } from 'msw'
import {
  createFavorite,
  createTag,
  deleteFavorite,
  getAllTags,
  getFavorites,
  getMessage,
  getNotifications,
  getPost,
  getReadManagements,
  getRoomsByLoginUserId,
  getTargetRoomMember,
  getUser,
  getUserGroupRelations,
} from './api'

export const handlers = [
  graphql.query('GetUserGroupRelations', getUserGroupRelations),
  graphql.query('GetUser', getUser),
  graphql.query('GetFavorites', getFavorites),
  graphql.query('GetAllTags', getAllTags),
  graphql.query('GetNotifications', getNotifications),
  graphql.query('GetTargetRoomMember', getTargetRoomMember),
  graphql.query('GetReadManagements', getReadManagements),
  graphql.query('GetPost', getPost),
  graphql.query('GetRoomsByLoginUserId', getRoomsByLoginUserId),
  graphql.query('GetMessage', getMessage),
  graphql.mutation('CreateFavorite', createFavorite),
  graphql.mutation('CreateTag', createTag),
  graphql.mutation('DeleteFavorite', deleteFavorite),
]

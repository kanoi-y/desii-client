import { graphql } from 'msw'
import { UserGroupRelation } from '~/types/generated/graphql'
import {
  favoriteFactory,
  userFactory,
  userGroupRelationFactory,
} from './factories'

export const handlers = [
  graphql.query('GetUserGroupRelations', (req, res, ctx) => {
    const { userId, groupId } = req.variables
    const query: Partial<UserGroupRelation> = {}
    if (userId) query.userId = userId
    if (groupId) query.groupId = groupId
    return res(
      ctx.data({
        GetUserGroupRelations: [
          {
            ...userGroupRelationFactory(query),
          },
        ],
      })
    )
  }),
  graphql.query('useGetUserQuery', (req, res, ctx) => {
    const { getUserId } = req.variables
    return res(
      ctx.data({
        useGetUserQuery: {
          ...userFactory({ id: getUserId }),
        },
      })
    )
  }),
  graphql.query('useGetFavoritesQuery', (req, res, ctx) => {
    const { postId } = req.variables
    return res(
      ctx.data({
        useGetFavoritesQuery: [
          {
            ...favoriteFactory({ postId }),
          },
        ],
      })
    )
  }),
]

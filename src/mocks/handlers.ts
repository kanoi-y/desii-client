import { graphql } from 'msw'
import { UserGroupRelation } from '~/types/generated/graphql'
import { userGroupRelationFactory } from './factories'

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
]

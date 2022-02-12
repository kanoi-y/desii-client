import { graphql } from 'msw'
import { userGroupRelationFactory } from './factories'

export const handlers = [
  graphql.query('GetUserGroupRelations', (req, res, ctx) => {
    const { userId, groupId } = req.variables

    return res(
      ctx.data({
        GetUserGroupRelations: [
          {
            ...userGroupRelationFactory({
              userId,
              groupId,
            }),
          },
        ],
      })
    )
  }),
]

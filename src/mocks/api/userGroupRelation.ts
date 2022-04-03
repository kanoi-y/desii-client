import { UserGroupRelation } from '~/types/generated/graphql'
import { userGroupRelationFactory } from '../factories'

export const getUserGroupRelations = (req: any, res: any, ctx: any) => {
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
}

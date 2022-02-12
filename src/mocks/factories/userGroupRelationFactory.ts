import { UserGroupRelation } from '~/types/generated/graphql'
import { groupFactory, userFactory } from '.'
import { nextFactoryId } from './factory'

export const userGroupRelationFactory = (
  options?: Partial<UserGroupRelation>
): UserGroupRelation => {
  return {
    __typename: 'UserGroupRelation',
    id: nextFactoryId('userGroupRelation'),
    userId: 'userId',
    groupId: 'groupId',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: userFactory({ id: options?.userId || 'userId' }),
    group: groupFactory({ id: options?.groupId || 'groupId' }),
    ...options,
  }
}

import { UserGroupRelation } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const userGroupRelationFactory = (
  options?: Partial<UserGroupRelation>
): UserGroupRelation => {
  return {
    id: nextFactoryId('userGroupRelation'),
    userId: 'userId',
    groupId: 'groupId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

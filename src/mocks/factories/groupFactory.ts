import { Group } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const groupFactory = (options?: Partial<Group>): Group => {
  return {
    __typename: 'Group',
    id: nextFactoryId('group'),
    name: 'name',
    image: 'image',
    description: 'description',
    adminUserId: 'adminUserId',
    productId: 'productId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

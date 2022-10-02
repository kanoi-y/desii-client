import { Group } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const groupFactory = (options?: Partial<Group>): Group => {
  return {
    id: nextFactoryId('group'),
    name: 'groupName',
    image: 'image',
    description: 'description',
    adminUserId: 'adminUserId',
    productId: 'productId',
    roomId: 'roomId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

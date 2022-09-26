import { Favorite } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const favoriteFactory = (options?: Partial<Favorite>): Favorite => {
  return {
    id: nextFactoryId('favorite'),
    createdUserId: 'userId',
    postId: 'postId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

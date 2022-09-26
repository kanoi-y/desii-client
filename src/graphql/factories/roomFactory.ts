import { Room } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const roomFactory = (options?: Partial<Room>): Room => {
  return {
    id: nextFactoryId('room'),
    latestMessageId: 'latestMessageId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

import { Room } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const roomFactory = (options?: Partial<Room>): Room => {
  return {
    __typename: 'Room',
    id: nextFactoryId('room'),
    latestMessageId: 'latestMessageId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

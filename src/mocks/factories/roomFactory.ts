import { Room } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'
import { groupFactory } from './groupFactory'

export const roomFactory = (options?: Partial<Room>): Room => {
  return {
    __typename: 'Room',
    id: nextFactoryId('room'),
    groupId: 'groupId',
    latestMessageId: 'latestMessageId',
    createdAt: new Date(),
    updatedAt: new Date(),
    group: groupFactory({ id: 'groupId', image: 'images/Desii_icon.png' }),
    ...options,
  }
}

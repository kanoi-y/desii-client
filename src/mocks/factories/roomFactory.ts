import { Room } from '~/types/generated/graphql'
import { groupFactory } from './'
import { nextFactoryId } from './factory'
import { messageFactory } from './messageFactory'

export const roomFactory = (options?: Partial<Room>): Room => {
  return {
    __typename: 'Room',
    id: nextFactoryId('room'),
    groupId: 'groupId',
    latestMessageId: 'latestMessageId',
    createdAt: new Date(),
    updatedAt: new Date(),
    group: groupFactory({ id: options?.groupId || 'groupId' }),
    latestMessage: messageFactory({
      id: options?.latestMessageId || 'latestMessageId',
    }),
    ...options,
  }
}

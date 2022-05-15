import { Room } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const roomFactory = (options?: Partial<Room>): Room => {
  return {
    __typename: 'Room',
    id: options?.id || nextFactoryId('room'),
    groupId: options?.groupId,
    latestMessageId: options?.latestMessageId,
    createdAt: options?.createdAt || new Date(),
    updatedAt: options?.updatedAt || new Date(),
    group: options?.group,
    latestMessage: options?.latestMessage,
  }
}

import { Message, MessageType } from '~/types/generated/graphql'
import { userFactory } from '.'
import { nextFactoryId } from './factory'

export const messageFactory = (options?: Partial<Message>): Message => {
  return {
    __typename: 'Message',
    id: nextFactoryId('message'),
    type: 'TEXT' as MessageType,
    roomId: 'roomId',
    userId: 'userId',
    body: 'mock message',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: userFactory({ id: options?.userId || 'userId' }),
    ...options,
  }
}

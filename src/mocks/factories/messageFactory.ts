import { Message, MessageType } from '~/types/generated/graphql'
import { userFactory } from '.'
import { nextFactoryId } from './factory'
import { roomFactory } from './roomFactory'

export const messageFactory = (options?: Partial<Message>): Message => {
  return {
    __typename: 'Message',
    id: options?.id || nextFactoryId('message'),
    type: options?.type || ('TEXT' as MessageType),
    roomId: options?.roomId || 'roomId',
    userId: options?.userId || 'userId',
    body: options?.body || 'mock message',
    createdAt: options?.createdAt || new Date(),
    updatedAt: options?.updatedAt || new Date(),
    user: options?.user || userFactory({ id: options?.userId || 'userId' }),
    room: options?.room || roomFactory({ id: options?.roomId || 'roomId' }),
  }
}

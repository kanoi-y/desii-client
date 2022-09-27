import { Message, MessageType } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const messageFactory = (options?: Partial<Message>): Message => {
  return {
    id: options?.id || nextFactoryId('message'),
    type: options?.type || ('TEXT' as MessageType),
    roomId: options?.roomId || 'roomId',
    userId: options?.userId || 'userId',
    body: options?.body || 'mock message',
    createdAt: options?.createdAt || new Date(),
    updatedAt: options?.updatedAt || new Date(),
  }
}

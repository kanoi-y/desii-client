import { Attachments } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const attachmentsFactory = (
  options?: Partial<Attachments>
): Attachments => {
  return {
    __typename: 'attachments',
    _id: nextFactoryId('attachments'),
    name: 'name',
    size: 100,
    filePath: 'filePath',
    createdUserId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

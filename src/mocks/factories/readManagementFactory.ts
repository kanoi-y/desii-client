import { ReadManagement } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const readManagementFactory = (
  options?: Partial<ReadManagement>
): ReadManagement => {
  return {
    __typename: 'ReadManagement',
    id: options?.id || nextFactoryId('readManagement'),
    targetUserId: options?.targetUserId || 'targetUserId',
    messageId: options?.messageId || 'messageId',
    isRead: options?.isRead ?? false,
    createdAt: options?.createdAt || new Date(),
    updatedAt: options?.updatedAt || new Date(),
  }
}

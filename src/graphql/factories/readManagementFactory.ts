import { ReadManagement } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const readManagementFactory = (
  options?: Partial<ReadManagement>
): ReadManagement => {
  return {
    id: options?.id || nextFactoryId('readManagement'),
    targetUserId: options?.targetUserId || 'targetUserId',
    messageId: options?.messageId || 'messageId',
    isRead: options?.isRead ?? false,
    createdAt: options?.createdAt || new Date(),
    updatedAt: options?.updatedAt || new Date(),
  }
}

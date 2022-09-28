import { Notification, NotificationType } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const notificationFactory = (
  options?: Partial<Notification>
): Notification => {
  return {
    id: nextFactoryId('notification'),
    type: NotificationType.FETCH_REACTION,
    createdUserId: 'createdUserId',
    targetUserId: 'targetUserId',
    message: 'mock userさんが「mock post」にいいねしました',
    url: '/post/mockPostId',
    isChecked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

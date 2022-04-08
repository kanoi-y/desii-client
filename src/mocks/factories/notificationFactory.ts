import { Notification, NotificationType } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const notificationFactory = (
  options?: Partial<Notification>
): Notification => {
  return {
    __typename: 'Notification',
    id: nextFactoryId('notification'),
    type: NotificationType.FetchReaction,
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

import { NotificationType } from '~/types/generated/graphql'
import { notificationFactory } from '../factories'

export const getNotifications = (req: any, res: any, ctx: any) => {
  const { targetUserId } = req.variables
  return res(
    ctx.data({
      GetNotifications: [
        {
          ...notificationFactory({ targetUserId }),
        },
        {
          ...notificationFactory({
            targetUserId,
            type: NotificationType.MatchPost,
            message: '「mock matching post」が「mock post」とマッチしました',
          }),
        },
        {
          ...notificationFactory({ targetUserId }),
        },
        {
          ...notificationFactory({
            targetUserId,
            type: NotificationType.MatchPost,
            message: '「mock matching post」が「mock post」とマッチしました',
          }),
        },
      ],
    })
  )
}

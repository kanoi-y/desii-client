import { readManagementFactory } from '../factories'

export const getReadManagements = (req: any, res: any, ctx: any) => {
  const { messageId } = req.variables

  const getReadManagements =
    messageId === 'messageId'
      ? [readManagementFactory({ messageId, isRead: true })]
      : []

  return res(
    ctx.data({
      GetReadManagements: getReadManagements,
    })
  )
}

import { messageFactory } from '../factories'

export const getMessage = (req: any, res: any, ctx: any) => {
  const { getMessageId } = req.variables

  return res(
    ctx.data({
      getMessage: messageFactory({ id: getMessageId }),
    })
  )
}

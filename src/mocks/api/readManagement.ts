import { readManagementFactory } from '../factories'

export const getReadManagements = (req: any, res: any, ctx: any) => {
  const { messageId } = req.variables

  return res(
    ctx.data({
      GetReadManagements: [
        {
          ...readManagementFactory({ messageId }),
        },
      ],
    })
  )
}

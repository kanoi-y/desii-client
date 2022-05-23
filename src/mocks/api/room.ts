import { roomFactory } from '../factories'

export const getRoomsByLoginUserId = (req: any, res: any, ctx: any) => {
  const { getRoomType } = req.variables

  return res(
    ctx.data({
      GetRoomsByLoginUserId: [
        roomFactory(),
        roomFactory(),
      ],
    })
  )
}

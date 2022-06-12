import { groupFactory } from '../factories'

export const getGroupByRoomId = (req: any, res: any, ctx: any) => {
  const { roomId } = req.variables

  return res(
    ctx.data({
      getGroupByRoomId:
        roomId === 'roomIdRelatedByGroup'
          ? groupFactory({ roomId: 'roomIdRelatedByGroup' })
          : null,
    })
  )
}

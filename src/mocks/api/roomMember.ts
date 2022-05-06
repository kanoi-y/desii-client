import { roomMemberFactory } from '../factories'

export const getTargetRoomMember = (req: any, res: any, ctx: any) => {
  const { roomId } = req.variables
  return res(
    ctx.data({
      GetTargetRoomMember: {
        ...roomMemberFactory({ roomId, userId: 'targetUserId' }),
      },
    })
  )
}

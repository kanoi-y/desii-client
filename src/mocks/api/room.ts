import { roomFactory } from '../factories'

const db = [
  roomFactory(),
  roomFactory(),
  roomFactory({ id: 'roomIdRelatedByGroup' }),
  roomFactory({ id: 'roomIdRelatedByGroup' }),
]

export const getRoomsByLoginUserId = (req: any, res: any, ctx: any) => {
  const { getRoomType } = req.variables

  const roomsByLoginUserId = db.filter((room) => {
    if (getRoomType === 'ONLY_ONE_ON_ONE') {
      return room.id !== 'roomIdRelatedByGroup'
    }

    if (getRoomType === 'ONLY_GROUP') {
      return room.id === 'roomIdRelatedByGroup'
    }

    return true
  })

  return res(
    ctx.data({
      GetRoomsByLoginUserId: roomsByLoginUserId,
    })
  )
}

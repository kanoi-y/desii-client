import { roomFactory } from '../factories'

const db = [
  roomFactory({ group: null }),
  roomFactory({ group: null }),
  roomFactory(),
  roomFactory(),
]

export const getRoomsByLoginUserId = (req: any, res: any, ctx: any) => {
  const { getRoomType } = req.variables

  const roomsByLoginUserId = db.filter((room) => {
    if (getRoomType === 'ONLY_ONE_ON_ONE') {
      return !room.group
    }

    if (getRoomType === 'ONLY_GROUP') {
      return !!room.group
    }

    return true
  })

  return res(
    ctx.data({
      GetRoomsByLoginUserId: roomsByLoginUserId,
    })
  )
}

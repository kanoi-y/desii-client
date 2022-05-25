import { roomFactory } from '../factories'

const db = [
  roomFactory({ groupId: null, group: null }),
  roomFactory({ groupId: null, group: null }),
  roomFactory(),
  roomFactory(),
]

export const getRoomsByLoginUserId = (req: any, res: any, ctx: any) => {
  const { getRoomType } = req.variables

  const roomsByLoginUserId = db.filter((room) => {
    if (getRoomType === 'ONLY_ONE_ON_ONE') {
      return !room.groupId
    }

    if (getRoomType === 'ONLY_GROUP') {
      return room.groupId
    }

    return true
  })

  return res(
    ctx.data({
      GetRoomsByLoginUserId: roomsByLoginUserId,
    })
  )
}

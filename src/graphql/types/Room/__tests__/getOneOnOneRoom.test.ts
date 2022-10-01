import { PrismaPromise, Room, RoomMember, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { roomFactory, roomMemberFactory, userFactory } from '../../../factories'
import { getOneOnOneRoomResolver } from '../resolver'

describe('getOneOnOneRoom', () => {
  let user: User
  let anotherUser: User
  let roomMemberUser: User
  let room: Room
  let roomMember1: RoomMember
  let roomMember2: RoomMember

  beforeAll(async () => {
    user = userFactory()
    anotherUser = userFactory()
    roomMemberUser = userFactory()
    room = roomFactory()
    roomMember1 = roomMemberFactory({
      roomId: room.id,
      userId: user.id,
    })
    roomMember2 = roomMemberFactory({
      roomId: room.id,
      userId: roomMemberUser.id,
    })
  })

  const findRoomMemberSpy = jest.spyOn(
    prismaMock.roomMember,
    'findMany'
  ) as jest.SpyInstance<PrismaPromise<(RoomMember & { room: Room })[]>>
  const findGroupSpy = jest.spyOn(prismaMock.group, 'findMany')

  test('ログインユーザーが存在しない', async () => {
    try {
      await getOneOnOneRoomResolver({
        memberId: roomMemberUser.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findRoomMemberSpy).not.toHaveBeenCalled()
    expect(findGroupSpy).not.toHaveBeenCalled()
  })

  test('userとmemberのOneOnOneRoomがない場合はnullが返る', async () => {
    findRoomMemberSpy.mockResolvedValue([{ ...roomMember2, room }])
    findGroupSpy.mockResolvedValue([])
    const res = await getOneOnOneRoomResolver({
      memberId: roomMemberUser.id,
      user: anotherUser,
    })

    expect(res).toEqual(null)
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
  })

  test('成功', async () => {
    findRoomMemberSpy.mockResolvedValue([
      { ...roomMember2, room },
      { ...roomMember1, room },
    ])
    findGroupSpy.mockResolvedValue([])
    const res = await getOneOnOneRoomResolver({
      memberId: roomMemberUser.id,
      user,
    })

    expect(res).toEqual(room)
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
  })
})

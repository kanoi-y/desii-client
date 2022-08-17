import { Room, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { getOneOnOneRoomResolver } from '../resolver'

describe('getOneOnOneRoom', () => {
  let user: User
  let anotherUser: User
  let roomMemberUser: User
  let room: Room

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    anotherUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
    roomMemberUser = await prisma.user.create({
      data: {
        name: 'name3',
        email: 'email3',
        image: 'image3',
      },
    })
    room = await prisma.room.create({
      data: {},
    })
    await prisma.roomMember.createMany({
      data: [
        {
          roomId: room.id,
          userId: user.id,
        },
        {
          roomId: room.id,
          userId: roomMemberUser.id,
        },
      ],
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findRoomMemberSpy = jest.spyOn(prisma.roomMember, 'findMany')
  const findGroupSpy = jest.spyOn(prisma.group, 'findMany')

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
    const res = await getOneOnOneRoomResolver({
      memberId: roomMemberUser.id,
      user: anotherUser,
    })

    expect(res).toEqual(null)
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await getOneOnOneRoomResolver({
      memberId: roomMemberUser.id,
      user,
    })

    expect(res).toEqual(room)
    expect(findRoomMemberSpy).toHaveBeenCalled()
    expect(findGroupSpy).toHaveBeenCalled()
  })
})

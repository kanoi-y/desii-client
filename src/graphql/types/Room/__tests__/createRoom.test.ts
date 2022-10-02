import { User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { roomFactory, userFactory } from '../../../factories'
import { createRoomResolver } from '../resolver'

describe('createRoom', () => {
  let user: User
  let roomMemberUser: User

  beforeAll(async () => {
    user = userFactory()
    roomMemberUser = userFactory()
  })

  const findUserSpy = jest.spyOn(prismaMock.user, 'findUnique')
  const createRoomSpy = jest.spyOn(prismaMock.room, 'create')
  const createRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'createMany')

  test('ログインユーザーが存在しない', async () => {
    try {
      await createRoomResolver({
        memberId: roomMemberUser.id,
        user: null,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findUserSpy).not.toHaveBeenCalled()
    expect(createRoomSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('ルームのメンバーが存在しない', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    try {
      await createRoomResolver({
        memberId: 'memberId',
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ルームのメンバーが存在しません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(createRoomSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('自分とのルームは作成できない', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user)
    try {
      await createRoomResolver({
        memberId: user.id,
        user,
      })
    } catch (e) {
      expect(e).toEqual(new Error('自分とのルームは作成できません'))
    }

    expect(findUserSpy).toHaveBeenCalled()
    expect(createRoomSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    prismaMock.user.findUnique.mockResolvedValue(roomMemberUser)
    prismaMock.room.create.mockResolvedValue(roomFactory())
    prismaMock.roomMember.createMany.mockResolvedValue({ count: 2 })

    await createRoomResolver({
      memberId: roomMemberUser.id,
      user,
    })

    expect(findUserSpy).toHaveBeenCalled()
    expect(createRoomSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).toHaveBeenCalled()
  })
})

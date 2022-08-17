import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { createRoomResolver } from '../resolver'

describe('createRoom', () => {
  let user: User
  let roomMemberUser: User

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })
    roomMemberUser = await prisma.user.create({
      data: {
        name: 'name2',
        email: 'email2',
        image: 'image2',
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findUserSpy = jest.spyOn(prisma.user, 'findUnique')
  const createRoomSpy = jest.spyOn(prisma.room, 'create')
  const createRoomMemberSpy = jest.spyOn(prisma.roomMember, 'createMany')

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
    await createRoomResolver({
      memberId: roomMemberUser.id,
      user,
    })

    expect(findUserSpy).toHaveBeenCalled()
    expect(createRoomSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).toHaveBeenCalled()
  })
})

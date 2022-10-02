import { User } from '@prisma/client'
import { prismaMock } from 'singleton'
import {
  groupFactory,
  roomFactory,
  roomMemberFactory,
  userFactory,
  userGroupRelationFactory,
} from '../../../factories'
import { createGroupResolver } from '../resolver'

describe('createGroup', () => {
  let user: User

  beforeAll(async () => {
    user = userFactory()
  })

  const createGroupSpy = jest.spyOn(prismaMock.group, 'create')
  const createRoomSpy = jest.spyOn(prismaMock.room, 'create')
  const createRoomMemberSpy = jest.spyOn(prismaMock.roomMember, 'create')
  const createUserGroupRelationSpy = jest.spyOn(
    prismaMock.userGroupRelation,
    'create'
  )

  test('ログインユーザーが存在しない', async () => {
    try {
      await createGroupResolver({
        user: null,
        name: 'group',
        image: 'image',
        productId: 'productId',
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(createGroupSpy).not.toHaveBeenCalled()
    expect(createRoomSpy).not.toHaveBeenCalled()
    expect(createRoomMemberSpy).not.toHaveBeenCalled()
    expect(createUserGroupRelationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const room = roomFactory()
    const roomMember = roomMemberFactory({ roomId: room.id, userId: user.id })
    const group = groupFactory({
      name: 'group',
      image: 'image',
      productId: 'productId',
      description: 'description',
      adminUserId: user.id,
      roomId: room.id,
    })
    const userGroupRelation = userGroupRelationFactory({
      userId: user.id,
      groupId: group.id,
    })
    prismaMock.room.create.mockResolvedValue(room)
    prismaMock.roomMember.create.mockResolvedValue(roomMember)
    prismaMock.group.create.mockResolvedValue(group)
    prismaMock.userGroupRelation.create.mockResolvedValue(userGroupRelation)
    await createGroupResolver({
      user,
      name: 'group',
      image: 'image',
      productId: 'productId',
    })

    expect(createGroupSpy).toHaveBeenCalled()
    expect(createRoomSpy).toHaveBeenCalled()
    expect(createRoomMemberSpy).toHaveBeenCalled()
    expect(createUserGroupRelationSpy).toHaveBeenCalled()
  })
})

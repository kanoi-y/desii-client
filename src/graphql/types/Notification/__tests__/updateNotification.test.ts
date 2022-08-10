import { Notification, User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { resetDatabase } from '../../../logics'
import { updateNotificationResolver } from '../resolver'

describe('updateNotification', () => {
  let user: User
  let targetUser: User
  let notification: Notification

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    })

    targetUser = await prisma.user.create({
      data: {
        name: 'targetUserName',
        email: 'targetUserEmail',
        image: 'targetUserImage',
      },
    })

    notification = await prisma.notification.create({
      data: {
        type: 'FETCH_REACTION',
        targetUserId: targetUser.id,
        message: 'message',
        url: 'url',
        isChecked: false,
      },
    })
  })

  afterAll(async () => {
    await resetDatabase()
    await prisma.$disconnect()
  })

  const findNotificationSpy = jest.spyOn(prisma.notification, 'findUnique')
  const updateNotificationSpy = jest.spyOn(prisma.notification, 'update')

  test('ログインユーザーが存在しない', async () => {
    try {
      await updateNotificationResolver({
        user: null,
        id: notification.id,
        isChecked: true,
      })
    } catch (e) {
      expect(e).toEqual(new Error('ログインユーザーが存在しません'))
    }

    expect(findNotificationSpy).not.toHaveBeenCalled()
    expect(updateNotificationSpy).not.toHaveBeenCalled()
  })

  test('通知が存在しない', async () => {
    try {
      await updateNotificationResolver({
        user: targetUser,
        id: 'id',
        isChecked: true,
      })
    } catch (e) {
      expect(e).toEqual(new Error('通知が存在しません'))
    }

    expect(findNotificationSpy).toHaveBeenCalled()
    expect(updateNotificationSpy).not.toHaveBeenCalled()
  })

  test('ログインユーザーが通知の対象ユーザーではない', async () => {
    try {
      await updateNotificationResolver({
        user,
        id: notification.id,
        isChecked: true,
      })
    } catch (e) {
      expect(e).toEqual(
        new Error('ログインユーザーが通知の対象ユーザーではありません')
      )
    }

    expect(findNotificationSpy).toHaveBeenCalled()
    expect(updateNotificationSpy).not.toHaveBeenCalled()
  })

  test('成功', async () => {
    const res = await updateNotificationResolver({
      user: targetUser,
      id: notification.id,
      isChecked: true,
    })

    expect(res.isChecked).toEqual(true)
    expect(findNotificationSpy).toHaveBeenCalled()
    expect(updateNotificationSpy).toHaveBeenCalled()
  })
})

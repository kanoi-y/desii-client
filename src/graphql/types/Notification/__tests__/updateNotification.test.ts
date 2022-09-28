import { Notification, User } from '@prisma/client'
import { prismaMock } from 'singleton'
import { notificationFactory, userFactory } from '../../../factories'
import { updateNotificationResolver } from '../resolver'

describe('updateNotification', () => {
  let user: User
  let targetUser: User
  let notification: Notification

  beforeAll(async () => {
    user = userFactory()
    targetUser = userFactory()
    notification = notificationFactory({
      targetUserId: targetUser.id,
    })
  })

  const findNotificationSpy = jest.spyOn(prismaMock.notification, 'findUnique')
  const updateNotificationSpy = jest.spyOn(prismaMock.notification, 'update')

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
    prismaMock.notification.findUnique.mockResolvedValue(null)
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
    prismaMock.notification.findUnique.mockResolvedValue(notification)
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
    prismaMock.notification.findUnique.mockResolvedValue(notification)
    prismaMock.notification.update.mockResolvedValue({
      ...notification,
      isChecked: true,
    })
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

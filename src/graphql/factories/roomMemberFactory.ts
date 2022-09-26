import { RoomMember } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const roomMemberFactory = (
  options?: Partial<RoomMember>
): RoomMember => {
  return {
    id: nextFactoryId('roomMember'),
    roomId: 'roomId',
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

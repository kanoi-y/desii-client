import { RoomMember } from '~/types/generated/graphql'
import { userFactory } from '.'
import { nextFactoryId } from './factory'
import { roomFactory } from './roomFactory'

export const roomMemberFactory = (
  options?: Partial<RoomMember>
): RoomMember => {
  return {
    __typename: 'RoomMember',
    id: nextFactoryId('roomMember'),
    roomId: 'roomId',
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: userFactory({
      id: options?.userId || 'userId',
      image: 'images/Desii_icon.png',
    }),
    room: roomFactory({ id: options?.roomId || 'roomId' }),
    ...options,
  }
}

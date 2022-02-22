import { Favorite } from '~/types/generated/graphql'
import { postFactory, userFactory } from '.'
import { nextFactoryId } from './factory'

export const favoriteFactory = (options?: Partial<Favorite>): Favorite => {
  return {
    __typename: 'Favorite',
    id: nextFactoryId('favorite'),
    createdUserId: 'userId',
    postId: 'postId',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdUser: userFactory({ id: options?.createdUserId || 'userId' }),
    post: postFactory({ id: options?.postId || 'postId' }),
    ...options,
  }
}

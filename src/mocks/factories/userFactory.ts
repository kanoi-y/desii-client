import { User } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const userFactory = (options?: Partial<User>): User => {
  return {
    __typename: 'User',
    id: nextFactoryId('user'),
    name: 'userName',
    description: 'description',
    email: 'email',
    image: 'image',
    accessToken: 'accessToken',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

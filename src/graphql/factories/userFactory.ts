import { User } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const userFactory = (options?: Partial<User>): User => {
  return {
    id: nextFactoryId('user'),
    name: 'userName',
    description: 'description',
    email: 'email',
    image: 'image',
    accessToken: 'accessToken',
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

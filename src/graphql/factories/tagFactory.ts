import { Tag } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const tagFactory = (options?: Partial<Tag>): Tag => {
  return {
    id: nextFactoryId('tag'),
    name: 'name',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

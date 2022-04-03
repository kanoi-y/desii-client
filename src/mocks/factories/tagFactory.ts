import { Tag } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const tagFactory = (options?: Partial<Tag>): Tag => {
  return {
    __typename: 'Tag',
    id: nextFactoryId('tag'),
    name: 'tagのname',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

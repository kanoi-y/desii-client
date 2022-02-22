import { Post, PostCategory } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'

export const postFactory = (options?: Partial<Post>): Post => {
  return {
    __typename: 'Post',
    id: nextFactoryId('post'),
    title: 'title',
    content: 'content',
    category: 'GIVE_ME' as PostCategory,
    createdUserId: 'createdUserId',
    isPrivate: false,
    groupId: 'groupId',
    bgImage: '/images/Desii_bgImage.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

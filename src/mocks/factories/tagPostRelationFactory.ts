import { TagPostRelation } from '~/types/generated/graphql'
import { nextFactoryId } from './factory'
import { postFactory, tagFactory } from './index'

export const tagPostRelationFactory = (
  options?: Partial<TagPostRelation>
): TagPostRelation => {
  return {
    __typename: 'TagPostRelation',
    id: nextFactoryId('tagPostRelation'),
    tagId: 'tagId',
    postId: 'postId',
    createdAt: new Date(),
    updatedAt: new Date(),
    post: postFactory({ id: options?.postId || 'postId' }),
    tag: tagFactory({ id: options?.tagId || 'tagId' }),
    ...options,
  }
}

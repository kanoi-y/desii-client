import { TagPostRelation } from '@prisma/client'
import { nextFactoryId } from '../../mocks/factories/factory'

export const tagPostRelationFactory = (
  options?: Partial<TagPostRelation>
): TagPostRelation => {
  return {
    id: nextFactoryId('tagPostRelation'),
    tagId: 'tagId',
    postId: 'postId',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  }
}

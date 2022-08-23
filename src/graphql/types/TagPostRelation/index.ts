import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import {
  createTagPostRelationResolver,
  createTagPostRelationsResolver,
  deleteTagPostRelationResolver,
  deleteTagPostRelationsResolver,
  getTagPostRelationsResolver,
} from './resolver'

export const TagPostInputType = inputObjectType({
  name: 'TagPostInputType',
  definition(t) {
    t.nonNull.string('tagId')
    t.nonNull.string('postId')
  },
})

export const TagPostRelation = objectType({
  name: 'TagPostRelation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('tagId')
    t.nonNull.string('postId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('tag', {
      type: 'Tag',
    })
    t.nonNull.field('post', {
      type: 'Post',
    })
  },
})

export const GetTagPostRelationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagId: stringArg(),
        postId: stringArg(),
      },
      resolve(_parent, args, _ctx) {
        return getTagPostRelationsResolver({
          postId: args.postId,
          tagId: args.tagId,
        })
      },
    })
  },
})

export const CreateTagPostRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTagPostRelation', {
      type: 'TagPostRelation',
      args: {
        tagId: nonNull(stringArg()),
        postId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return createTagPostRelationResolver({
          postId: args.postId,
          tagId: args.tagId,
          user: ctx.user,
        })
      },
    })
  },
})

export const CreateTagPostRelationsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.list.nonNull.field('createTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagIds: nonNull(list(nonNull(stringArg()))),
        postId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return createTagPostRelationsResolver({
          postId: args.postId,
          tagIds: args.tagIds,
          user: ctx.user,
        })
      },
    })
  },
})

export const DeleteTagPostRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteTagPostRelation', {
      type: 'TagPostRelation',
      args: {
        tagId: nonNull(stringArg()),
        postId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return deleteTagPostRelationResolver({
          postId: args.postId,
          tagId: args.tagId,
          user: ctx.user,
        })
      },
    })
  },
})

export const DeleteTagPostRelationsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.list.nonNull.field('DeleteTagPostRelations', {
      type: 'TagPostRelation',
      args: {
        tagPostTypes: nonNull(list(nonNull('TagPostInputType'))),
      },
      resolve(_parent, args, ctx) {
        return deleteTagPostRelationsResolver({
          tagPostTypes: args.tagPostTypes,
          user: ctx.user,
        })
      },
    })
  },
})

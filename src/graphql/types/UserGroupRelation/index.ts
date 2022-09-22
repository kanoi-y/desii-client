import { extendType, nonNull, objectType, stringArg } from 'nexus'
import {
  createUserGroupRelationResolver,
  DeleteUserGroupRelationResolver,
  getUserGroupRelationsResolver,
} from './resolver'

export const UserGroupRelation = objectType({
  name: 'UserGroupRelation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('userId')
    t.nonNull.string('groupId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('user', {
      type: 'User',
    })
    t.nonNull.field('group', {
      type: 'Group',
    })
  },
})

export const GetUserGroupRelationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetUserGroupRelations', {
      type: 'UserGroupRelation',
      args: {
        userId: stringArg(),
        groupId: stringArg(),
      },
      resolve(_parent, args, _ctx) {
        return getUserGroupRelationsResolver({
          groupId: args.groupId,
          userId: args.userId,
        })
      },
    })
  },
})

export const CreateUserGroupRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUserGroupRelation', {
      type: 'UserGroupRelation',
      args: {
        userId: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return createUserGroupRelationResolver({
          groupId: args.groupId,
          userId: args.userId,
          user: ctx.user,
        })
      },
    })
  },
})

export const DeleteUserGroupRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteUserGroupRelation', {
      type: 'UserGroupRelation',
      args: {
        userId: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return DeleteUserGroupRelationResolver({
          groupId: args.groupId,
          userId: args.userId,
          user: ctx.user,
        })
      },
    })
  },
})

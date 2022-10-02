import { extendType, nonNull, objectType, stringArg } from 'nexus'
import {
  createGroupResolver,
  deleteGroupResolver,
  getGroupByProductIdResolver,
  getGroupByRoomIdResolver,
  getGroupResolver,
  updateGroupResolver,
} from './resolver'

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.string('image')
    t.nonNull.string('adminUserId')
    t.nonNull.string('productId')
    t.nonNull.string('roomId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getGroupResolver({
          id: args.id,
        })
      },
    })
  },
})

export const GetGroupByRoomIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGroupByRoomId', {
      type: 'Group',
      args: {
        roomId: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getGroupByRoomIdResolver({
          roomId: args.roomId,
        })
      },
    })
  },
})

export const GetGroupByProductIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGroupByProductId', {
      type: 'Group',
      args: {
        productId: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getGroupByProductIdResolver({
          productId: args.productId,
        })
      },
    })
  },
})

export const CreateGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createGroup', {
      type: 'Group',
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        image: nonNull(stringArg()),
        productId: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return createGroupResolver({
          name: args.name,
          description: args.description,
          image: args.image,
          productId: args.productId,
          user: ctx.user,
        })
      },
    })
  },
})

export const DeleteGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return deleteGroupResolver({
          id: args.id,
          user: ctx.user,
        })
      },
    })
  },
})

export const UpdateGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateGroup', {
      type: 'Group',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
        image: stringArg(),
        adminUserId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return updateGroupResolver({
          id: args.id,
          user: ctx.user,
          name: args.name,
          description: args.description,
          image: args.image,
          adminUserId: args.adminUserId,
        })
      },
    })
  },
})

import { extendType, nonNull, objectType, stringArg } from 'nexus'
import {
  createUserResolver,
  deleteUserResolver,
  getCurrentUserResolver,
  getUserResolver,
  updateUserResolver,
} from './resolver'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.field('emailVerified', {
      type: 'DateTime',
    })
    t.string('description')
    t.string('image')
    t.string('accessToken')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetCurrentUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getCurrentUser', {
      type: 'User',
      args: {
        accessToken: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getCurrentUserResolver({
          accessToken: args.accessToken,
        })
      },
    })
  },
})

export const GetUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, _ctx) {
        return getUserResolver({
          id: args.id,
        })
      },
    })
  },
})

export const CreateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        description: stringArg(),
        image: stringArg(),
      },
      resolve(_parent, args, _ctx) {
        return createUserResolver({
          description: args.description,
          email: args.email,
          name: args.name,
          image: args.image,
        })
      },
    })
  },
})

export const DeleteUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return deleteUserResolver({
          id: args.id,
          user: ctx.user,
        })
      },
    })
  },
})

export const UpdateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        email: stringArg(),
        description: stringArg(),
        image: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return updateUserResolver({
          id: args.id,
          name: args.name,
          email: args.email,
          description: args.description,
          image: args.image,
          user: ctx.user,
        })
      },
    })
  },
})

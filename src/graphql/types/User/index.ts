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
      resolve: getCurrentUserResolver,
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
      resolve: getUserResolver,
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
      resolve: createUserResolver,
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
      resolve: deleteUserResolver,
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
      resolve: updateUserResolver,
    })
  },
})

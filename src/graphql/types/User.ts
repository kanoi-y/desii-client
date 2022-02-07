import { extendType, nonNull, objectType, stringArg } from 'nexus'

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

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
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
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findFirst({
          where: {
            accessToken: args.accessToken,
          },
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
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: args.id,
          },
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
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            description: args.description,
            image: args.image,
          },
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
        return ctx.prisma.user.delete({
          where: {
            id: args.id,
          },
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
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!user) {
          throw new Error('ユーザーが存在しません')
        }

        const updateUser = {
          name: args.name || user.name,
          email: args.email || user.email,
          description: args.description || user.description,
          image: args.image || user.image,
        }

        return ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: updateUser,
        })
      },
    })
  },
})

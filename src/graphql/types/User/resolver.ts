import { Context } from '../../context'

export const getCurrentUserResolver = (
  _parent: {},
  args: {
    accessToken: string
  },
  ctx: Context
) => {
  return ctx.prisma.user.findFirst({
    where: {
      accessToken: args.accessToken,
    },
  })
}

export const getUserResolver = (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
  return ctx.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  })
}

export const createUserResolver = (
  _parent: {},
  args: {
    description?: string | null
    email: string
    image?: string | null
    name: string
  },
  ctx: Context
) => {
  return ctx.prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      description: args.description,
      image: args.image,
    },
  })
}

export const deleteUserResolver = async (
  _parent: {},
  args: {
    id: string
  },
  ctx: Context
) => {
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

  if (ctx.user.id !== user.id) {
    throw new Error('ユーザーとログインユーザーが異なっています')
  }
  return ctx.prisma.user.delete({
    where: {
      id: args.id,
    },
  })
}

export const updateUserResolver = async (
  _parent: {},
  args: {
    description?: string | null
    email?: string | null
    id: string
    image?: string | null
    name?: string | null
  },
  ctx: Context
) => {
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

  if (ctx.user.id !== user.id) {
    throw new Error('ユーザーとログインユーザーが異なっています')
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
}

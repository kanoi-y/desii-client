import { Context } from '../../context'

export const getAllTagsResolver = (
  _parent: {},
  args: {
    searchText?: string | null
    sort: 'asc' | 'desc' | null
  },
  ctx: Context
) => {
  return ctx.prisma.tag.findMany({
    where: {
      name: {
        contains: args.searchText || '',
      },
    },
    orderBy: {
      createdAt: args.sort || 'asc',
    },
  })
}

export const getTagByNameResolver = (
  _parent: {},
  args: {
    name: string
  },
  ctx: Context
) => {
  return ctx.prisma.tag.findUnique({
    where: {
      name: args.name,
    },
  })
}

export const createTagResolver = (
  _parent: {},
  args: {
    name: string
  },
  ctx: Context
) => {
  if (!ctx.user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return ctx.prisma.tag.create({
    data: {
      name: args.name,
    },
  })
}

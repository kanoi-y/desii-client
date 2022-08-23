import { User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getAllTagsResolver = ({
  searchText,
  sort,
}: {
  searchText?: string | null
  sort: 'asc' | 'desc' | null
}) => {
  return prisma.tag.findMany({
    where: {
      name: {
        contains: searchText || '',
      },
    },
    orderBy: {
      createdAt: sort || 'asc',
    },
  })
}

export const getTagByNameResolver = ({ name }: { name: string }) => {
  return prisma.tag.findUnique({
    where: {
      name,
    },
  })
}

export const createTagResolver = ({
  name,
  user,
}: {
  name: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  return prisma.tag.create({
    data: {
      name,
    },
  })
}

import { User } from '@prisma/client'
import { prisma } from '../../../lib/prisma'

export const getCurrentUserResolver = ({
  accessToken,
}: {
  accessToken: string
}) => {
  return prisma.user.findFirst({
    where: {
      accessToken,
    },
  })
}

export const getUserResolver = ({ id }: { id: string }) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const createUserResolver = ({
  description,
  email,
  image,
  name,
}: {
  description?: string | null
  email: string
  image?: string | null
  name: string
}) => {
  return prisma.user.create({
    data: {
      name,
      email,
      description,
      image,
    },
  })
}

export const deleteUserResolver = async ({
  id,
  user,
}: {
  id: string
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const userById = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!userById) {
    throw new Error('ユーザーが存在しません')
  }

  if (user.id !== userById.id) {
    throw new Error('ユーザーとログインユーザーが異なっています')
  }
  return prisma.user.delete({
    where: {
      id,
    },
  })
}

export const updateUserResolver = async ({
  description,
  email,
  id,
  image,
  name,
  user,
}: {
  description?: string | null
  email?: string | null
  id: string
  image?: string | null
  name?: string | null
  user: User | null
}) => {
  if (!user) {
    throw new Error('ログインユーザーが存在しません')
  }

  const userById = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!userById) {
    throw new Error('ユーザーが存在しません')
  }

  if (user.id !== userById.id) {
    throw new Error('ユーザーとログインユーザーが異なっています')
  }

  const updateUser = {
    name: name || user.name,
    email: email || user.email,
    description: description || user.description,
    image: image || user.image,
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: updateUser,
  })
}

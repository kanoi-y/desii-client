import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { User } from '~/types/generated/graphql'
import { prisma } from '../lib/prisma'

export type Context = {
  prisma: PrismaClient
  user: User | null
}

export async function createContext({
  req,
}: {
  req: MicroRequest
}): Promise<Context> {
  const bearerToken = req.headers.authorization || ''

  const bearer = bearerToken.split(' ')
  const accessToken = bearer[1] || ''

  const user = await prisma.user.findFirst({
    where: {
      accessToken: {
        equals: accessToken,
      },
    },
  })
  return {
    prisma,
    user,
  }
}

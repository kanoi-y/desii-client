import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { User } from '~/types/generated/graphql'
import { prisma } from '../lib/prisma'

export type Context = {
  prisma: PrismaClient
  user: User | null
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
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

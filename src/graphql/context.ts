import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { prisma } from '../lib/prisma'

export type Context = {
  prisma: PrismaClient
  session: Session | null
}

export async function createContext({
  req,
}: {
  req: MicroRequest
}): Promise<Context> {
  const session = await getSession({ req })
  return {
    prisma,
    session,
  }
}

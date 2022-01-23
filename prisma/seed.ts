import { prisma } from '../src/lib/prisma'

const main = async () => {
  await prisma.attachment.create({
    data: {
      id: "attachment1",
      name: 'name',
      size: 100,
      filePath: 'filePath',
      createdUserId: 'user1',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { prisma } from '../src/lib/prisma'

const main = async () => {
  await prisma.user.create({
    data: {
      id: 'user1',
      name: 'user1',
      email: 'email',
      description: 'description',
      image: 'images/Desii_icon.png',
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

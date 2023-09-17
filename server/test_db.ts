import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)
  createUser({
    data: {
      username: 'eduzrdoo',
      avatar: 'https://avatars.githubusercontent.com/u/43072438?v=4',
      email: 'eduardoliveira.dev@gmail.com',
      password: '$2y$07$rcXFeIAGyqzNrCmL34TOz.05OMWmyboPgN3ZWDz76mGjXe0RXGD/q',
    },
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

async function createUser(userCreateArgs: Prisma.UserCreateArgs) {
  const createdUser = await prisma.user.create(userCreateArgs)
  console.log(createdUser)
}

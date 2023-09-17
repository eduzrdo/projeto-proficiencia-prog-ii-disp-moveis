import Fastify from 'fastify'

import { signupRoute as usersRoute } from './src/routes/user.route'

const fastify = Fastify()

fastify.get('/', async () => {
  return { hello: 'world' }
})

fastify.register(usersRoute, { prefix: '/user' })

const start = async () => {
  try {
    const address = await fastify.listen({ port: 3333, host: '0.0.0.0' })
    console.log(`Server listening on ${address}...`)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()

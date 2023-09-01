import Fastify from 'fastify'

import { signupRoute as usersRoute } from './src/routes/users.route'

const fastify = Fastify()

fastify.get('/', async () => {
  return { hello: 'world' }
})

fastify.register(usersRoute, { prefix: '/users' })

const start = async () => {
  try {
    await fastify.listen({ port: 3333 })
    console.log('Servidor escutando na porta 3333...')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()

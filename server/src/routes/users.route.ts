import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const userSchema = z.object({
  id: z.coerce.number(),
})
export async function signupRoute(fastify: FastifyInstance) {
  fastify.get('/', () => {
    return 'Essa é a rota "users"'
  })

  fastify.get('/:id', (request) => {
    try {
      const { id } = userSchema.parse(request.params)
      return { userId: id }
    } catch (error) {
      fastify.log.error('ID is required')
      return 'ID is required'
    }
  })
}

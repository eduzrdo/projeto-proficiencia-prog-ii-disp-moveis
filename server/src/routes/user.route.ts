import { FastifyInstance } from 'fastify'

import { userController } from "../controllers/user.controller"

export async function signupRoute(fastify: FastifyInstance) {
  fastify.get('/:username', userController.findUser)
  fastify.get('/', userController.findAll)

  fastify.post('/', userController.authenticate)
}

import { FastifyInstance } from 'fastify'

import { userController } from "../controllers/user.controller"

export async function userRoute(fastify: FastifyInstance) {
  fastify.get('/:username', userController.findUser)
  fastify.get('/', userController.findAll)
  
  fastify.post('/save-game', userController.saveGame)

  fastify.post('/signin', userController.authenticate)
  fastify.post('/signup', userController.register)

  fastify.delete('/', userController.removeAllUsers)
}

import { FastifyInstance } from 'fastify'

import { userController } from "../controllers/user.controller"

export async function userRoute(fastify: FastifyInstance) {
  fastify.get('/:id', userController.findUser)
  fastify.get('/', userController.findAll)
  
  fastify.post('/save-game', userController.saveGame)

  fastify.post('/sign-in', userController.authenticate)
  fastify.post('/sign-up', userController.register)
  fastify.post('/clear-user-data', userController.clearUserData)

  fastify.delete('/', userController.removeAllUsers)
}

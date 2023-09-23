import { FastifyInstance } from 'fastify'

import { wordController } from "../controllers/word.controller"

export async function wordRoute(fastify: FastifyInstance) {
  fastify.get('/', wordController.findAll)
  fastify.get('/seed-database', wordController.seedDatabase)
  
  fastify.post('/draw', wordController.draw)

  fastify.delete('/', wordController.removeAllWords)
}

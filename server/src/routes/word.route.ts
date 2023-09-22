import { FastifyInstance } from 'fastify'

import { wordController } from "../controllers/word.controller"

export async function wordRoute(fastify: FastifyInstance) {
  fastify.get('/', wordController.drawWord)
}

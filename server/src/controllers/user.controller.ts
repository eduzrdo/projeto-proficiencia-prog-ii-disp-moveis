import { FastifyRequest } from "fastify"
import { z } from "zod"

import { prisma } from "../prisma/client"

const userSchemaFindUser = z.object({
  username: z.coerce.string(),
})

const userSchemaAuthenticate = z.object({
  email: z.coerce.string(),
  password: z.coerce.string(),
})

export const userController = {
  findUser: async (request: FastifyRequest) => {
    try {
      const { username } = userSchemaFindUser.parse(request.params)

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
          admin: true,
          wins: true,
          defeats: true,
          score: true,
        }
      })
      return user
    } catch (error) {
      console.log(error)
      return {
        error: "Usuário não encontrado."
      }
    }
  },

  findAll: async () => {
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          avatar: true,
          admin: true,
          score: true,
        }
      })
      return allUsers
    } catch (error) {
      console.log(error)
      return {
        error: "Erro ao buscar todos os usuários."
      }
    }
  },

  authenticate: async (request: FastifyRequest) => {
    try {
      const { email, password } = userSchemaAuthenticate.parse(request.body)

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        }
      })
      
      return user
    } catch (error) {
      console.log(error)
      return {
        error: "E-mail ou senha incorreta."
      }
    }
  }
}
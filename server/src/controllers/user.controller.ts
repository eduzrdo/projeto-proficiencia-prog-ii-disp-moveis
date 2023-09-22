import { FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../prisma/client";
import { fastify } from "../../server";
import console from "console";

const userSchemaFindUser = z.object({
  username: z.coerce.string(),
});

const userSchemaAuthenticate = z.object({
  username: z.coerce.string(),
  password: z.coerce.string(),
});

export const userController = {
  findUser: async (request: FastifyRequest) => {
    try {
      const { username } = userSchemaFindUser.parse(request.params);

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
        },
      });
      return {
        ok: false,
        data: user,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Usuário não encontrado.",
      };
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
        },
      });
      return {
        ok: true,
        data: allUsers,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Erro ao buscar todos os usuários.",
      };
    }
  },

  authenticate: async (request: FastifyRequest) => {
    try {
      const { username, password } = userSchemaAuthenticate.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: `Usuário "${username}" não encontrado.`,
        };
      }

      const passwordIsCorrect = await fastify.bcrypt.compare(
        password,
        user.password
      );

      if (!passwordIsCorrect) {
        return {
          ok: false,
          error: "Oops! Senha incorreta. Verifique e tente novamente.",
        };
      }

      const response = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        score: user.score,
        wins: user.wins,
        defeats: user.defeats,
        admin: user.admin,
      };

      return {
        ok: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Houve um erro ao tentar acessar o jogo. Tente novamente mais tarde.",
      };
    }
  },

  register: async (request: FastifyRequest) => {
    try {
      const { username, password } = userSchemaAuthenticate.parse(request.body);

      const userExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userExists) {
        return {
          ok: false,
          error: "Esse nome de usuário j́a está sendo usado. Por favor, escolha outro.",
        };
      }

      const hash = await fastify.bcrypt.hash(password);

      const user = await prisma.user.create({
        data: {
          username,
          password: hash,
        },
      });

      const response = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        score: user.score,
        wins: user.wins,
        defeats: user.defeats,
        admin: user.admin,
      };

      return {
        ok: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Houve um erro no cadastro. Tente novamente mais tarde.",
      };
    }
  },
};

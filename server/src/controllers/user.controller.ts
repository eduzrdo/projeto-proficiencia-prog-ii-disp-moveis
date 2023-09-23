import { FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../prisma/client";
import { fastify } from "../../server";
import console from "console";
import { calculateScore } from "../utils/calculateScore";
import { Prisma } from "@prisma/client";

const username = z
  .string({
    required_error: "field 'username' is mandatory.",
    invalid_type_error: "'username' type is invalid. Type must be a STRING.",
  })
  .min(6, {
    message: "'username' must have at least 6 characters.",
  });

const userSchemaFindAll = z.object({
  amount: z.coerce.number().int().min(1).optional(),
});

const userSchemaFindUser = z.object({
  id: z.string(),
});

const userSchemaAuthenticate = z.object({
  username,
  password: z.string().min(6, {
    message: "field 'password' must have at least 6 characters.",
  }),
});

const userSchemaSaveGame = z.object({
  userId: z.string({
    required_error: "field 'userId' is mandatory.",
    invalid_type_error: "'userId' type is invalid. Type must be a STRING.",
  }),
  wordId: z.string({
    required_error: "field 'wordId' is mandatory.",
    invalid_type_error: "'wordId' type is invalid. Type must be a STRING.",
  }),
  gameDuration: z
    .number({
      required_error: "field 'gameDuration' is mandatory.",
      invalid_type_error:
        "field 'gameDuration' type is invalid. Type must be a NUMBER.",
    })
    .int({
      message: "field 'gameDuration' type is invalid. Type must be an INTEGER.",
    })
    .positive(),
  gameResult: z
    .number({
      required_error: "field 'gameResult' is mandatory.",
      invalid_type_error:
        "'gameResult' type is invalid. Type must be a NUMBER.",
    })
    .int({
      message: "field 'gameDuration' type is invalid. Type must be an INTEGER.",
    })
    .min(0)
    .max(1),
});

const publicUserData = {
  id: true,
  username: true,
  avatar: true,
  admin: true,
  wins: true,
  defeats: true,
  games: true,
  score: true,
  playedWordsIds: true,
};

export const userController = {
  findUser: async (request: FastifyRequest) => {
    try {
      const { id } = userSchemaFindUser.parse(request.params);

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
        select: publicUserData,
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

  findAll: async (request: FastifyRequest) => {
    try {
      const { amount } = userSchemaFindAll.parse(request.query);

      let options: {
        take?: number;
        orderBy: { score: "asc" | "desc" };
      } = {
        orderBy: {
          score: "desc",
        },
      };

      if (amount) {
        options.take = amount;
        options.orderBy.score = "desc";
      }

      const allUsers = await prisma.user.findMany({
        select: publicUserData,
        ...options,
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
          error: `Usuário '${username}' não encontrado.`,
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
        admin: user.admin,
        wins: user.wins,
        defeats: user.defeats,
        games: user.games,
        score: user.score,
        playedWordsIds: user.playedWordsIds,
      };

      return {
        ok: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error:
          "Houve um erro ao tentar acessar o jogo. Tente novamente mais tarde.",
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
          error:
            "Esse nome de usuário j́a está sendo usado. Por favor, escolha outro.",
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
        admin: user.admin,
        wins: user.wins,
        defeats: user.defeats,
        games: user.games,
        score: user.score,
        playedWordsIds: user.playedWordsIds,
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

  saveGame: async (request: FastifyRequest) => {
    try {
      const { userId, wordId, gameDuration, gameResult } =
        userSchemaSaveGame.parse(request.body);

      const playedWord = await prisma.word.findUniqueOrThrow({
        where: {
          id: wordId,
        },
      });

      const wordLength = playedWord.word.length;

      let dataResult: {
        score?: {
          increment: number;
        };
        wins?: {
          increment: 1;
        };
        defeats?: {
          increment: 1;
        };
        games: {
          increment: 1;
        };
      } = {
        games: {
          increment: 1,
        },
      };

      if (gameResult === 0) {
        dataResult.defeats = {
          increment: 1,
        };
      } else {
        dataResult.wins = {
          increment: 1,
        };
        dataResult.score = {
          increment: calculateScore(wordLength, gameDuration),
        };
      }

      const updatedUserData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: dataResult,
        select: publicUserData,
      });

      return {
        ok: true,
        data: {
          updatedUserData,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Houve um erro para salvar o progresso.",
      };
    }
  },

  removeAllUsers: async () => {
    try {
      const response = await prisma.user.deleteMany();

      return {
        ok: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error:
          "Error text not defined. See userController.removeAllUsers catch stratement.",
      };
    }
  },
};

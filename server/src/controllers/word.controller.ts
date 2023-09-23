import { FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../prisma/client";
import { fastify } from "../../server";

import { wordlist } from "../utils/wordlist";
import { normalizeWord } from "../utils/normalizeWord";

const wordSchemaDraw = z.object({
  userId: z.string({
    required_error: "field 'userId' is mandatory.",
    invalid_type_error: "'userId' type is invalid. Type must be a STRING.",
  }),
});

export const wordController = {
  findAll: async () => {
    try {
      const words = await prisma.word.findMany();

      return {
        ok: true,
        data: words,
      };
    } catch (error) {
      return {
        ok: false,
        error:
          "Error text not defined. See wordController.drawWord catch stratement.",
      };
    }
  },

  draw: async (request: FastifyRequest) => {
    try {
      const { userId } = wordSchemaDraw.parse(request.body);


      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      const words = await prisma.word.findMany();

      const availableWordsIds = words.filter((word) => {
        return !user.playedWordsIds.includes(word.id);
      });

      const drawnWordIndex = Math.floor(
        Math.random() * availableWordsIds.length
      );

      const drawnWord = availableWordsIds[drawnWordIndex];

      const availableWordsIdsUpdateOperation =
        availableWordsIds.length === 1
          ? []
          : {
              push: drawnWord.id,
            };

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          playedWordsIds: availableWordsIdsUpdateOperation,
        },
      });

      return {
        ok: true,
        data: drawnWord,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error:
          "Houve um erro ao sortear uma palavra. Tente novamente mais tarde.",
      };
    }
  },

  seedDatabase: async () => {
    try {
      const normalizedWordList = wordlist.map(item => {
        return {
          ...item,
          normalizedWord: normalizeWord(item.word),
        }
      })

      const addedWords = await prisma.word.createMany({
        data: normalizedWordList,
      });

      return {
        ok: true,
        data: addedWords,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error:
          "Error text not defined. See wordController.addWord catch stratement.",
      };
    }
  },

  removeAllWords: async () => {
    try {
      const response = await prisma.word.deleteMany();

      return {
        ok: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error:
          "Error text not defined. See wordController.removeAllWords catch stratement.",
      };
    }
  },
};

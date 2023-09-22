import { FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../prisma/client";
import { fastify } from "../../server";

const userSchemaFindUser = z.object({
  username: z.coerce.string(),
});

const userSchemaAuthenticate = z.object({
  username: z.coerce.string(),
  password: z.coerce.string(),
});

export const wordController = {
  drawWord: async (request: FastifyRequest) => {
    try {
      
    } catch (error) {
      console.log(error);
      return {
        error: "",
      };
    }
  },
};

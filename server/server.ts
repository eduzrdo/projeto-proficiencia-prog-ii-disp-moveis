import Fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyStatic from "@fastify/static";
import path from "node:path";

import { serverConfig } from "./src/config/server";

import { userRoute } from "./src/routes/user.route";
import { wordRoute } from "./src/routes/word.route";

export const fastify = Fastify();

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.register(fastifyBcrypt);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public", "avatar"),
  prefix: "/avatar",
});

fastify.register(userRoute, { prefix: "/user" });
fastify.register(wordRoute, { prefix: "/word" });

const start = async () => {
  try {
    const address = await fastify.listen({
      port: serverConfig.serverPort,
      host: "0.0.0.0",
    });
    console.log(`Server listening on ${address}...`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

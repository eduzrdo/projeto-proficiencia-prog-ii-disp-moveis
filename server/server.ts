import Fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";

import { userRoute } from "./src/routes/user.route";
import { wordRoute } from "./src/routes/word.route";

export const fastify = Fastify();

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.register(fastifyBcrypt);
fastify.register(userRoute, { prefix: "/user" });
fastify.register(wordRoute, { prefix: "/word" });

const start = async () => {
  try {
    const address = await fastify.listen({ port: 3333, host: "0.0.0.0" });
    console.log(`Server listening on ${address}...`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

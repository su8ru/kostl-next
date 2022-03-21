import { defineController } from "./$relay";

export default defineController((fastify) => ({
  get: () => ({ status: 200, body: fastify.hoge }),
}));

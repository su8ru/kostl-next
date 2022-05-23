import { defineController } from "./$relay";
import useCalendarCache from "$/service/useCalendarCache";

export default defineController((fastify) => ({
  get: async () => {
    return { status: 200, body: await useCalendarCache(fastify) };
  },
}));

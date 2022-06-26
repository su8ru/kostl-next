import useCalendarCache from "$/service/useCalendarCache";
import { defineController } from "./$relay";

export default defineController((fastify) => ({
  get: async () => {
    return { status: 200, body: await useCalendarCache(fastify) };
  },
}));

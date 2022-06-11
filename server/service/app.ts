import Fastify, { FastifyServerFactory } from "fastify";
import fp from "fastify-plugin";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { API_BASE_PATH } from "$/service/envValues";
import server from "$/$server";
import { kvsMemoryStorage } from "@kvs/memorystorage";
import { CacheSchema } from "$/types/kvs";

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors, {
    credentials: true,
    origin: true,
  });
  app.register(cookie, {});
  app.register(
    fp(async (app) => {
      const kvs = await kvsMemoryStorage<CacheSchema>({
        name: "cache",
        version: 1,
      });
      app.decorate("kvs", kvs);
    })
  );
  server(app, { basePath: API_BASE_PATH });
  return app;
};

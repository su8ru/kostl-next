import path from "path";
import Fastify, { FastifyServerFactory } from "fastify";
import fp from "fastify-plugin";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import fastifyStatic from "fastify-static";
import { API_BASE_PATH } from "$/service/envValues";
import server from "$/$server";
import { kvsMemoryStorage } from "@kvs/memorystorage";
import { CacheSchema } from "$/types/kvs";

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors);
  app.register(fastifyStatic, {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
  });
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

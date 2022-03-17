import path from "path";
import Fastify, { FastifyServerFactory } from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import fastifyStatic from "fastify-static";
import { API_BASE_PATH } from "$/service/envValues";
import server from "$/$server";

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors);
  app.register(fastifyStatic, {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
  });
  server(app, { basePath: API_BASE_PATH });
  return app;
};

import fastify from "fastify";
import { KvsMemoryStorage } from "@kvs/memorystorage";
import { CacheSchema } from "$/types/kvs";

declare module "fastify" {
  export interface FastifyInstance {
    kvs: KvsMemoryStorage<CacheSchema>;
  }
}

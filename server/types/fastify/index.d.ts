import { CacheSchema } from "$/types/kvs";
import { KvsMemoryStorage } from "@kvs/memorystorage";

declare module "fastify" {
  export interface FastifyInstance {
    kvs: KvsMemoryStorage<CacheSchema>;
  }
}

import { FastifyInstance } from "fastify";
import { Traffic } from "$/types/train";
import parseKeio from "$/service/apiParser/keio";
import parseToei from "$/service/apiParser/toei";
import fetch from "node-fetch";
import Body from "$/types/keioApi";
import OdptTrain from "$/types/toeiApi";

const cacheHandler = async (
  fastify: FastifyInstance,
  key: "keio" | "toei",
  apiUrl: string,
  ttl = 5
): Promise<{ fromKV: boolean } & Traffic> => {
  const reqTime = new Date().getTime();
  const cache = await fastify.kvs.get(key);

  if (cache && cache.timestamp + ttl * 1000 > reqTime)
    return { fromKV: true, ...cache.data };

  const res = await fetch(apiUrl);
  const data = await (async () => {
    if (key === "keio") return await parseKeio((await res.json()) as Body);
    if (key === "toei")
      return await parseToei((await res.json()) as OdptTrain[]);
    return { timestamp: "", trains: [] };
  })();
  const timestamp = new Date().getTime();
  await fastify.kvs.set(key, { timestamp, data });
  return { fromKV: false, ...data };
};

export default cacheHandler;

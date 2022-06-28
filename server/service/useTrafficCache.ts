import { FastifyInstance } from "fastify";
import parseKeio from "$/service/apiParser/traffic/keio";
import parseToei from "$/service/apiParser/traffic/toei";
import useCalendarCache from "$/service/useCalendarCache";
import { Body } from "$/types/keioApi";
import { Train as OdptTrain } from "$/types/toeiApi";
import { Traffic } from "$/types/train";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const useTrafficCache = async (
  fastify: FastifyInstance,
  key: "keio" | "toei",
  apiUrl: string,
  ttl = 5
): Promise<{ fromKV: boolean } & Traffic> => {
  const reqTime = new Date().getTime();
  const trafficCache = await fastify.kvs.get(key);

  // if valid traffic cache exists
  if (trafficCache && trafficCache.timestamp + ttl * 1000 > reqTime)
    return { fromKV: true, ...trafficCache.data };

  const { day } = await useCalendarCache(fastify);

  const trains = await prisma.train.findMany({
    select: {
      id: true,
      operationId: true,
    },
    where: {
      day: day ?? "WEEKDAY",
    },
  });
  const operationDict = Object.fromEntries(
    trains.map(({ id, operationId }) => [id, { operationId }])
  );

  const unitPosts = await prisma.unitPost.findMany({
    select: {
      operationId: true,
      unitId: true,
    },
    where: {
      disabledAt: {
        equals: null,
      },
    },
  });
  const unitDict: Record<string, string> = Object.fromEntries(
    unitPosts.map(({ operationId, unitId }) => [operationId, unitId])
  );

  const res = await fetch(apiUrl);
  const data = await (async () => {
    if (key === "keio")
      return await parseKeio(
        (await res.json()) as Body,
        operationDict,
        unitDict
      );
    if (key === "toei")
      return await parseToei(
        (await res.json()) as OdptTrain[],
        operationDict,
        unitDict,
        fastify
      );
    return { timestamp: "", trains: [] };
  })();
  const timestamp = new Date().getTime();
  await fastify.kvs.set(key, { timestamp, data });
  return { fromKV: false, ...data };
};
export default useTrafficCache;

import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Traffic } from "$/types/train";
import parseKeio from "$/service/apiParser/keio";
import parseToei from "$/service/apiParser/toei";
import fetch from "node-fetch";
import Body from "$/types/keioApi";
import OdptTrain from "$/types/toeiApi";
import dayjs from "dayjs";
import { API_ODPT_TOKEN } from "$/service/envValues";

const prisma = new PrismaClient();

const cacheHandler = async (
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

  const calendarCache = await fastify.kvs.get("calendar");
  const day = calendarCache
    ? calendarCache.calendar
    : await fetchCalendar(fastify);

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

  const res = await fetch(apiUrl);
  const data = await (async () => {
    if (key === "keio")
      return await parseKeio((await res.json()) as Body, operationDict);
    if (key === "toei")
      return await parseToei((await res.json()) as OdptTrain[], operationDict);
    return { timestamp: "", trains: [] };
  })();
  const timestamp = new Date().getTime();
  await fastify.kvs.set(key, { timestamp, data });
  return { fromKV: false, ...data };
};

const fetchCalendar = async (
  fastify: FastifyInstance
): Promise<"WEEKDAY" | "HOLIDAY" | null> => {
  console.log("cache not found");
  const day = dayjs().subtract(4, "hour").format("YYYY-MM-DD");
  const res = await fetch(
    `https://api.odpt.org/api/v4/odpt:Calendar?odpt:operator=odpt.Operator:Toei&odpt:day=${day}&acl:consumerKey=${API_ODPT_TOKEN}`
  );
  const json = await res.json();
  if (Array.isArray(json) && json.length) {
    const calendarInstance = json[0];
    if (
      typeof calendarInstance === "object" &&
      "dc:title" in calendarInstance
    ) {
      const title = calendarInstance["dc:title"];
      if (typeof title === "string") {
        const calendar = title === "平日" ? "WEEKDAY" : "HOLIDAY";
        fastify.kvs.set("calendar", {
          day,
          calendar,
        });
        return calendar;
      }
    }
  }
  return null;
};

export default cacheHandler;

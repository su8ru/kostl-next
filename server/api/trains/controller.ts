import { defineController } from "./$relay";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { API_ODPT_TOKEN } from "$/service/envValues";
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export default defineController((fastify) => ({
  get: async () => {
    const cache = await fastify.kvs.get("calendar");
    const day = cache ? cache.calendar : await fetchCalendar(fastify);
    if (!day)
      return { status: 500, body: "The response from ODPT was invalid." };

    const ops = await prisma.operation.findMany({
      select: {
        id: true,
        trains: {
          where: {
            day,
          },
          select: {
            id: true,
            depTime: true,
          },
          orderBy: {
            depTime: "asc",
          },
        },
      },
    });

    return {
      status: 200,
      body: ops,
    };
  },
}));

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

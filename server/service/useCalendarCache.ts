import { FastifyInstance } from "fastify";
import { API_ODPT_TOKEN } from "$/service/envValues";
import { CalendarCache } from "$/types/kvs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import fetch from "node-fetch";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const useCalendarCache = async (
  fastify: FastifyInstance
): Promise<CalendarCache> => {
  const today = dayjs().tz().subtract(4, "hour").format("YYYY-MM-DD");

  const calendarCache = await fastify.kvs.get("calendar");
  if (calendarCache && calendarCache.date === today) return calendarCache;

  const res = await fetch(
    `https://api.odpt.org/api/v4/odpt:Calendar?odpt:operator=odpt.Operator:Toei&odpt:day=${today}&acl:consumerKey=${API_ODPT_TOKEN}`
  );
  const json = await res.json();
  if (Array.isArray(json) && json.length) {
    const instance = json.find((instance) => {
      if (typeof instance === "object" && "dc:title" in instance) {
        const title = instance["dc:title"];
        if (typeof title === "string" && title) return true;
      }
      return false;
    });
    if (instance) {
      const title = instance["dc:title"];
      const day = title === "平日" ? "WEEKDAY" : "HOLIDAY";
      const obj: CalendarCache = {
        date: today,
        day,
      };
      fastify.kvs.set("calendar", obj);
      return obj;
    }
  }
  return {
    date: today,
    day: null,
  };
};

export default useCalendarCache;

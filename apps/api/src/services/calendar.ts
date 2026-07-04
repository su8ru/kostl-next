import { CalendarResponse } from "../env";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

export const getServiceDate = (): string =>
  dayjs().tz().subtract(4, "hour").format("YYYY-MM-DD");

export const fetchCalendar = async (
  odptToken: string
): Promise<CalendarResponse> => {
  const date = getServiceDate();
  const url = new URL("https://api.odpt.org/api/v4/odpt:Calendar");
  url.searchParams.set("odpt:operator", "odpt.Operator:Toei");
  url.searchParams.set("odpt:day", date);
  url.searchParams.set("acl:consumerKey", odptToken);

  const res = await fetch(url.toString());
  if (!res.ok) return { date, day: null };

  const json: unknown = await res.json();
  if (Array.isArray(json)) {
    const instance = json.find((value) => {
      if (!value || typeof value !== "object") return false;
      const title = (value as { "dc:title"?: unknown })["dc:title"];
      return typeof title === "string" && title.length > 0;
    });
    const title =
      instance && typeof instance === "object"
        ? (instance as { "dc:title"?: unknown })["dc:title"]
        : null;
    if (title === "平日") return { date, day: "WEEKDAY" };
    if (typeof title === "string") return { date, day: "HOLIDAY" };
  }

  return { date, day: null };
};

import type { AppType } from "@kostl/api";
import type { Traffic } from "@kostl/shared/types/train";
import type { TrainTimetable } from "@kostl/shared/types/trainTimetable";
import { hc } from "hono/client";

type CalendarResponse = {
  date: string;
  day: "WEEKDAY" | "HOLIDAY" | null;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://api.kostl.info");

const client = hc<AppType>(API_BASE_URL);

const assertOk = async (res: Response): Promise<void> => {
  if (!res.ok) throw new Error(await res.text());
};

export const fetchCalendar = async (): Promise<CalendarResponse> => {
  const res = await client.api.calendar.$get();
  await assertOk(res);
  return (await res.json()) as CalendarResponse;
};

export const fetchTraffic = async (key: "keio" | "toei"): Promise<Traffic> => {
  const res = await client.api.traffic[":key"].$get({ param: { key } });
  await assertOk(res);
  const traffic = (await res.json()) as {
    fromKV: boolean;
  } & Traffic;
  return { timestamp: traffic.timestamp, trains: traffic.trains };
};

export const fetchTrainTimetable = async (
  trainId: string
): Promise<TrainTimetable> => {
  const res = await client.api.trainTimetable[":trainId"].$get({
    param: { trainId },
  });
  await assertOk(res);
  return (await res.json()) as TrainTimetable;
};

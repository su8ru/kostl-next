import { Traffic } from "$/types/train";

type TrafficCache = { timestamp: number; data: Traffic };
type CalendarCache = { day: string; calendar: "WEEKDAY" | "HOLIDAY" };

export type CacheSchema = {
  keio: TrafficCache;
  toei: TrafficCache;
  calendar: CalendarCache;
};

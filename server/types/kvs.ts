import { Traffic } from "$/types/train";

export type TrafficCache = { timestamp: number; data: Traffic };
export type CalendarCache = { date: string; day: "WEEKDAY" | "HOLIDAY" | null };

export type CacheSchema = {
  keio: TrafficCache;
  toei: TrafficCache;
  calendar: CalendarCache;
};

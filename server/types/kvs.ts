import { Traffic } from "$/types/train";

export type CacheSchema = {
  [key in "keio" | "toei"]: { timestamp: number; data: Traffic };
};

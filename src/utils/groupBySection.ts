import { Train } from "~/traffic-api/@types";
import { GetGridArea } from "~/utils/gridArea";

export const groupBySection = (
  trains: Train[],
  getGridArea: GetGridArea
): [string, Train[]][] => {
  return Array.from(
    trains.reduce<Map<string, Train[]>>((map, curr) => {
      const key = getGridArea(curr.section, curr.direction);
      const value = map.get(key);
      if (value) map.set(key, [...value, curr]);
      else map.set(key, [curr]);
      return map;
    }, new Map())
  );
};

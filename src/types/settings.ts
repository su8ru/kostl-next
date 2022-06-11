export type TrainItemsSetting = TrainItem[];

export type TrainItem = typeof trainItemArray[number];
export const trainItemArray = [
  "trainId",
  "operationId",
  "destination",
  "unitId",
  "carCount",
] as const;

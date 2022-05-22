export type TrainItemsSetting = TrainItem[];

export type TrainItem = typeof trainItemArray[number];
export const trainItemArray = [
  "trainId",
  "operationId",
  "destination",
  "carId",
  "carCount",
] as const;

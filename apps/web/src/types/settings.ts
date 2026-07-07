export type TrainItemsSetting = TrainItem[];

export type TrainItem = (typeof trainItemArray)[number];
export const trainItemArray = [
  "trainId",
  "destination",
  "carCount",
  "vehicleModel",
] as const;

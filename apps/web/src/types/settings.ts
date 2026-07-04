export type TrainItemsSetting = TrainItem[];

export type TrainItem = (typeof trainItemArray)[number];
export const trainItemArray = ["trainId", "destination", "carCount"] as const;

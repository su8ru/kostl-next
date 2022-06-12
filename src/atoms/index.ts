import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TrainItemsSetting } from "~/types/settings";

export const trainItemsSettingAtom = atomWithStorage<TrainItemsSetting>(
  "trainItemsSetting",
  ["trainId", "destination"]
);

export const trainBoxHeightAtom = atom<number>(
  (get) => get(trainItemsSettingAtom).length * 21 + 16
);

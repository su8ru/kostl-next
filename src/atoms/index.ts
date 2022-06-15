import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TrainItemsSetting } from "~/types/settings";
import { Train } from "$/types/train";

export const trainItemsSettingAtom = atomWithStorage<TrainItemsSetting>(
  "trainItemsSetting",
  ["trainId", "destination"]
);

export const trainBoxHeightAtom = atom<number>(
  (get) => get(trainItemsSettingAtom).length * 21 + 16
);

type TriggerDetails = (train: Train) => void;
export const triggerDetailsAtom = atom<TriggerDetails | null>(null);

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { TrainItemsSetting } from "~/types/settings";

const { persistAtom } = recoilPersist();

const trainItemsSettingState = atom<TrainItemsSetting>({
  key: "trainItemsSetting",
  default: ["trainId", "destination"],
  effects_UNSTABLE: [persistAtom],
});

export default trainItemsSettingState;

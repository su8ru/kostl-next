import { CalendarDay } from "../env";
import parseKeio from "../parsers/trainTimetable/keio";
import parseToei from "../parsers/trainTimetable/toei";
import { TrainTimetable as KeioTrainTimetable } from "@kostl/shared/types/keioApi";
import { TrainTimetable as ToeiTrainTimetable } from "@kostl/shared/types/toeiApi";
import { TrainTimetable } from "@kostl/shared/types/trainTimetable";

export const fetchTrainTimetable = async (
  trainId: string,
  day: CalendarDay,
  odptToken: string
): Promise<TrainTimetable> => {
  const isToei = ["K", "T"].includes(trainId.slice(-1));
  if (!isToei) {
    const res = await fetch(`https://i.opentidkeio.jp/dia/${trainId}.json`);
    if (!res.ok) return [];
    return parseKeio((await res.json()) as KeioTrainTimetable).trainTimetable;
  }

  const url = new URL("https://api.odpt.org/api/v4/odpt:TrainTimetable");
  url.searchParams.set("odpt:railway", "odpt.Railway:Toei.Shinjuku");
  url.searchParams.set("odpt:trainNumber", trainId);
  url.searchParams.set("acl:consumerKey", odptToken);
  const res = await fetch(url.toString());
  if (!res.ok) return [];
  return (await parseToei((await res.json()) as ToeiTrainTimetable[], day))
    .trainTimetable;
};

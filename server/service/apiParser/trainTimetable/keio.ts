import { TrainTimetable as KeioTrainTimetable } from "$/types/keioApi";
import { TimetableRecord, TrainTimetable } from "$/types/trainTimetable";

const parseKeio = (
  raw: KeioTrainTimetable
): {
  trainTimetable: TrainTimetable;
} => {
  const trainTimetable: TimetableRecord[] = raw.dy
    .filter(({ tt }) => tt)
    .map(({ st, sn, tt }, index, arr) => ({
      line: "keio",
      staId: +st,
      staName: sn,
      [index !== arr.length - 1 ? "depTime" : "arrTime"]: tt,
    }));

  return { trainTimetable };
};

export default parseKeio;

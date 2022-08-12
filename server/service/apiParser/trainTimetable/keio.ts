import { allKeioStationsJa } from "$/service/data";
import { TrainTimetable as KeioTrainTimetable } from "$/types/keioApi";
import { TimetableRecord, TrainTimetable } from "$/types/trainTimetable";

const parseKeio = (
  raw: KeioTrainTimetable
): {
  trainTimetable: TrainTimetable;
} => {
  const trainTimetable: TimetableRecord[] = raw.dy
    .filter(({ tt }) => tt)
    .map(({ sn, tt }) => {
      const time = tt.padStart(5, "0");
      if (sn === "新線新宿") {
        return {
          line: "keio",
          staId: 1,
          staName: "新線新宿",
          arrTime: time,
        };
      }
      return {
        line: "keio",
        staId: allKeioStationsJa.indexOf(sn) + 1,
        staName: sn,
        arrTime: time,
      };
    });

  return { trainTimetable };
};

export default parseKeio;

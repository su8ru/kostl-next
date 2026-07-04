import { allToeiStationsEn, allToeiStationsJa } from "@kostl/shared/data";
import { TrainTimetable as OdptTrainTimetable } from "@kostl/shared/types/toeiApi";
import {
  TimetableRecord,
  TrainTimetable,
} from "@kostl/shared/types/trainTimetable";

const parseToei = async (
  raw: OdptTrainTimetable[],
  day: "WEEKDAY" | "HOLIDAY" | null
): Promise<{
  trainTimetable: TrainTimetable;
}> => {
  const _raw: OdptTrainTimetable | undefined = raw.find(
    ({ "odpt:calendar": calendar }) => {
      const apiCalendar = calendar?.split(":")?.pop()?.toLowerCase();
      return day === "WEEKDAY"
        ? apiCalendar === "weekday"
        : apiCalendar !== "weekday";
    }
  );
  if (!_raw) return { trainTimetable: [] };
  const trainTimetable: TimetableRecord[] = _raw[
    "odpt:trainTimetableObject"
  ].map(
    ({
      "odpt:departureStation": depStation,
      "odpt:arrivalStation": arrStation,
      "odpt:arrivalTime": arrTime,
      "odpt:departureTime": depTime,
    }) => {
      const staNameEn = (depStation ?? arrStation ?? "").split(".").pop() ?? "";
      const staId = allToeiStationsEn.indexOf(staNameEn) + 1;
      return {
        line: staId === 1 ? "keio" : "toei",
        staId,
        staName: allToeiStationsJa[staId - 1],
        arrTime,
        depTime,
      };
    }
  );

  return { trainTimetable };
};

export default parseToei;

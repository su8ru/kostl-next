import { toeiStationsEn, toeiStationsJa } from "$/service/data";
import { TrainTimetable as OdptTrainTimetable } from "$/types/toeiApi";
import { TimetableRecord, TrainTimetable } from "$/types/trainTimetable";
import { FastifyInstance } from "fastify";
import useCalendarCache from "$/service/useCalendarCache";

const parseToei = async (
  raw: OdptTrainTimetable[],
  fastify: FastifyInstance
): Promise<{
  trainTimetable: TrainTimetable;
}> => {
  const { day } = await useCalendarCache(fastify);
  const _raw: OdptTrainTimetable | undefined = raw.find(
    ({ "odpt:calendar": calendar }) => {
      const apiCalendar = calendar?.split(".")?.pop()?.toLowerCase();
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
      const staId = toeiStationsEn.indexOf(staNameEn) + 1;
      return {
        line: "toei",
        staId,
        staName: toeiStationsJa[staId - 1],
        arrTime,
        depTime,
      };
    }
  );

  return { trainTimetable };
};

export default parseToei;

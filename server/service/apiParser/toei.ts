import { Section, Train, TrainDirection } from "$/types/train";
import OdptTrain from "$/types/toeiApi";
import { destListKeio, destListToei } from "$/service/data";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import valueToKey from "$/utils/valueToKey";

dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const parseToei = (
  raw: OdptTrain[],
  operationDict: Record<string, { operationId: string }>
): { timestamp: string; trains: Train[] } => {
  let date = dayjs(0);

  const trains: Train[] = raw
    // 不要な部分を削ぎ落とし
    .map(
      ({
        "odpt:trainNumber": id,
        "odpt:trainType": type,
        "odpt:railDirection": direction,
        "odpt:destinationStation": destinations,
        "odpt:delay": delay,
        "odpt:toStation": toStation,
        "odpt:fromStation": fromStation,
        "odpt:trainOwner": trainOwner,
        "dc:date": updateDate,
      }) => {
        date = dayjs.max(date, dayjs(updateDate, "Asia/Tokyo"));

        return {
          id,
          type: type?.split(".").pop(),
          direction: direction?.split(":").pop(),
          dest: destinations?.[0].split(".").pop(),
          delay,
          toStation: toStation?.split(".").pop(),
          fromStation: fromStation?.split(".").pop(),
          trainOwner: trainOwner?.split(":").pop(),
        };
      }
    )
    // 希望の形式に変換
    .map<Train>(
      ({
        id,
        type,
        direction: _direction,
        dest,
        delay,
        toStation,
        fromStation,
        trainOwner,
      }) => {
        const direction = _direction === "Westbound" ? "West" : "East";
        return {
          id,
          type: type === "Express" ? "2" : "6",
          direction,
          operationId: toAltOperationId(
            operationDict[id]?.operationId,
            trainOwner
          ),
          delay: delay ? delay / 60 : 0,
          dest: destToId(dest ?? "ERROR"),
          length: null,
          section: stationToSection(
            fromStation ?? "ERROR",
            toStation ?? null,
            direction
          ),
        };
      }
    )
    .filter(({ section: { id, type } }) => !(id === 1 && type === "Sta"));

  if (date.unix() === 0) date = dayjs();

  return { timestamp: date.local().format(), trains };
};

const destToId = (dest: string): string => {
  const destJa = destListToei[dest] ?? "ERROR";
  return valueToKey(destListKeio, destJa) ?? "999";
};

const stationToSection = (
  fromStation: string,
  toStation: string | null,
  direction: TrainDirection
): Section => {
  if (toStation)
    // 駅間走行中
    return {
      id: toeiStations.indexOf(toStation) + 1,
      type: "Way",
      track: direction === "West" ? 1 : 2,
    };
  // 駅停車中
  else
    return {
      id: toeiStations.indexOf(fromStation) + 1,
      type: "Sta",
      track: direction === "West" ? 1 : 2,
    };
};

const toAltOperationId = (
  operationId: string | undefined,
  trainOwner?: string
): string | null => {
  if (!operationId) return null;
  if (!trainOwner) return operationId;
  const num = parseInt(operationId);
  const char = operationId.slice(-1);
  const owner = trainOwner.slice(0, 1);
  if (char !== owner) return `${num}${owner.toLowerCase()}${char}`;
  return operationId;
};

const toeiStations: ReadonlyArray<string> = [
  "Shinjuku",
  "ShinjukuSanchome",
  "Akebonobashi",
  "Ichigaya",
  "Kudanshita",
  "Jimbocho",
  "Ogawamachi",
  "Iwamotocho",
  "BakuroYokoyama",
  "Hamacho",
  "Morishita",
  "Kikukawa",
  "Sumiyoshi",
  "NishiOjima",
  "Ojima",
  "HigashiOjima",
  "Funabori",
  "Ichinoe",
  "Mizue",
  "Shinozaki",
  "Motoyawata",
] as const;

export default parseToei;

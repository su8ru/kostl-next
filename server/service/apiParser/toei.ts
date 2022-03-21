import { Section, Train, TrainDirection } from "$/types/train";
import OdptTrain from "$/types/toeiApi";
import { destListKeio, destListToei } from "$/service/data";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);

const parseToei = (
  raw: OdptTrain[]
): { timestamp: string; trains: Train[] } => {
  const date = dayjs();

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
      }) => ({
        id,
        type: type?.split(".").pop(),
        direction: direction?.split(".").pop(),
        dest: destinations?.[0].split(".").pop(),
        delay,
        toStation: toStation?.split(".").pop(),
        fromStation: fromStation?.split(".").pop(),
      })
    )
    // 希望の形式に変換
    .map(
      ({
        id,
        type,
        direction: _direction,
        dest,
        delay,
        toStation,
        fromStation,
      }) => {
        const direction = _direction === "Westbound" ? "West" : "East";
        return {
          id,
          type: type === "Express" ? "2" : "6",
          direction,
          delay: delay ?? 0,
          dest: destToId(dest ?? "ERROR"),
          length: null,
          section: stationToSection(
            fromStation ?? "ERROR",
            toStation ?? null,
            direction
          ),
        };
      }
    );

  return { timestamp: date.format("YYYY.MM.DD HH:mm:ss"), trains };
};

const destToId = (dest: string): string => {
  const destJa = destListToei[dest] ?? "ERROR";
  return (
    Object.keys(destListKeio).filter(
      (key) => destListKeio[key] === destJa
    )[0] ?? "999"
  );
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

import Body, { Dt, TB, TS } from "$/types/keioApi";
import { Section, SectionType, Train, TrainDirection } from "$/types/train";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";

dayjs.extend(arraySupport);

const parseKeio = (raw: Body): { timestamp: string; trains: Train[] } => {
  const trains: Train[] = [];

  // 駅停車中
  trains.push(
    ...(raw.TS ?? [])
      .filter(({ id, sn }) => sn !== "I" && id.substring(1, 2) !== "1")
      .flatMap(({ id, ps }: TS) =>
        ps.map<Train>((train) => ({
          id: train.tr.trim(),
          type: train.sy_tr,
          direction: (shouldReverse(id, +train.bs) ? !+train.ki : +train.ki)
            ? "West"
            : "East",
          delay: +train.dl ?? 0,
          dest: train.ik_tr,
          length: +train.sr,
          section: {
            id: sectionIdToNumber(id),
            type: "Sta",
            // "2S", "3S" などの対策
            track: parseInt(train.bs, 10) === 10 ? 0 : parseInt(train.bs, 10),
          },
        }))
      )
  );

  // 駅間走行中
  trains.push(
    ...(raw.TB ?? [])
      .filter(
        ({ id, sn }) =>
          sn !== "I" && id.substring(1, 2) !== "1" && id !== "D001"
      )
      .flatMap(({ id, ps }: TB) =>
        ps.map<Train>((train) => {
          const { direction, section } = sectionIdToSection(id);
          return {
            id: train.tr.trim(),
            type: train.sy_tr,
            direction,
            delay: +train.dl ?? 0,
            dest: train.ik_tr,
            length: +train.sr,
            section,
          };
        })
      )
  );

  return { timestamp: dtToTime(raw.up[0].dt), trains };
};

const shouldReverse = (sectionId: string, track: number): boolean => {
  // 高幡不動 1番線
  if (sectionId === "E027" && track === 1) return true;
  // 多摩動物公園
  if (sectionId === "E037") return true;
  // そのまま
  return false;
};

const sectionIdToNumber = (sectionId: string): number => {
  const sectionNo: number = +sectionId.substring(1) ?? 99;

  // 新宿駅
  if (sectionNo == 1) return 1;
  // 本線
  if (2 <= sectionNo && sectionNo <= 32) return sectionNo + 2;
  // 新線
  if (33 <= sectionNo && sectionNo <= 35) return sectionNo - 32;
  // 競馬場線
  if (sectionNo == 36) return 46;
  // 動物園線
  if (sectionNo == 37) return 47;
  // 高尾線
  if (38 <= sectionNo && sectionNo <= 43) return sectionNo + 10;
  // 相模原線
  if (44 <= sectionNo && sectionNo <= 54) return sectionNo - 9;

  return 99;
};

const sectionIdToType = (sectionId: string): SectionType => {
  const sectionNo: number = +sectionId.substring(1) ?? 99;

  if (33 <= sectionNo && sectionNo <= 54) return "WayB";

  return "Way";
};

const sectionIdToSection = (
  sectionId: string
): { direction: TrainDirection; section: Section } => {
  const prefix = sectionId.substring(0, 1);

  // 笹塚
  if (sectionId === "S002")
    return { direction: "West", section: { id: 4, type: "WayB", track: 1 } };
  // 調布
  if (sectionId === "S018")
    return { direction: "East", section: { id: 18, type: "WayB", track: 2 } };
  // 東府中
  if (sectionId === "S021")
    return { direction: "East", section: { id: 23, type: "WayB", track: 2 } };
  // 高幡不動
  if (sectionId === "S027")
    return { direction: "West", section: { id: 29, type: "WayB", track: 1 } };
  // 北野
  if (sectionId === "S033")
    return { direction: "East", section: { id: 33, type: "WayB", track: 2 } };

  // 動物園線（上下が逆）
  if (sectionId === "D037")
    return { direction: "East", section: { id: 47, type: "WayB", track: 2 } };

  return {
    direction: prefix === "U" ? "East" : "West",
    section: {
      id: sectionIdToNumber(sectionId),
      type: sectionIdToType(sectionId),
      track: prefix === "U" ? 2 : 1,
    },
  };
};

const dtToTime = (dt: Dt[]): string => {
  if (dt.length) {
    const _dt: Dt = dt[0];
    const m = dayjs([+_dt.yy, +_dt.mt - 1, +_dt.dy, +_dt.hh, +_dt.mm, +_dt.ss]);
    return m.format("YYYY.MM.DD HH:mm:ss");
  }
  return dayjs().format("YYYY.MM.DD HH:mm:ss");
};

export default parseKeio;

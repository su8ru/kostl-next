import { Section, TrainDirection } from "$/types/train";

const COLUMN_MAIN = 5;
const COLUMN_SUB = 15;
const COLUMN_BRANCH = 10;

type GridArea =
  | `${number} / ${number}`
  | `${number} / ${number} / ${number} / ${number}`;

export type GetGridArea = (
  section: Section,
  direction: TrainDirection
) => GridArea;

export const getGridAreaKeio: GetGridArea = (section, direction) => {
  const { id, type, track } = section;

  const row =
    _getGridRowKeio(section) +
    (type === "Sta" ? 0 : direction === "East" ? 1 : -1);

  const column = _getGridColumnKeio(section);

  if (id === 1 && type === "Way" && track === 2)
    return `${row} / ${column} / ${row + 5} / ${column}`;
  if (id === 4 && type === "Way" && track === 1)
    return `${row - 4} / ${column} / ${row + 1} / ${column}`;

  return `${row} / ${column}`;
};

export const getGridAreaToei: GetGridArea = (section, direction) => {
  const { id, type } = section;

  const row =
    43 - id * 2 + (type === "Sta" ? 0 : direction === "East" ? 1 : -1);
  const column = COLUMN_BRANCH + (direction === "West" ? 1 : -3);

  return `${row} / ${column} / ${row + 1} / ${column + 3}`;
};

const _getGridRowKeio = (section: Section): number => {
  const { id } = section;

  // 京王線・京王新線
  if (1 <= id && id <= 34) return id * 2 - 1;
  // 相模原線
  if (35 <= id && id <= 45) return (id - 16) * 2 - 1;
  // 競馬場線
  if (id === 46) return 24 * 2 - 1;
  // 動物園線
  if (id === 47) return 28 * 2 - 1;
  // 高尾線
  if (48 <= id && id <= 53) return (id - 14) * 2 - 1;

  return 0;
};

const _getGridColumnKeio = (section: Section): number => {
  const { id, type, track } = section;

  if (type === "Sta") {
    // 本線・新線
    if (1 <= id && id <= 34) {
      // 新宿駅
      if (id === 1) {
        if (track <= 3) return _calcColumn(1, COLUMN_MAIN, track);
        return _calcColumn(4, COLUMN_BRANCH, track);
      }
      // 新線
      if (2 <= id && id <= 3) return _calcColumn(1, COLUMN_BRANCH, track);
      // 本線 2面4線
      if ([4, 8, 14, 18, 24, 33].includes(id))
        return _calcColumn(2, COLUMN_MAIN, track);
      // 東府中・高幡不動
      if ([23, 29].includes(id)) return _calcColumn(3, COLUMN_MAIN, track);
      return _calcColumn(1, COLUMN_MAIN, track);
    }
    // 競馬場線・動物園線
    if (id === 46 || id === 47) return _calcColumn(1, COLUMN_BRANCH, track);
    // 相模原線・高尾線
    if (35 <= id && id <= 53) {
      if ([39, 41].includes(id)) return _calcColumn(2, COLUMN_SUB, track);
      return _calcColumn(1, COLUMN_SUB, track);
    }
  }

  if (type === "WayB") {
    // 京王新線・競馬場線・動物園線
    if ([1, 2, 3, 4, 46, 47, 23, 29].includes(id))
      return _calcColumn(1, COLUMN_BRANCH, track);
    // 相模原線・高尾線
    return _calcColumn(1, COLUMN_SUB, track);
  }

  // 本線
  return _calcColumn(1, COLUMN_MAIN, track);
};

const _calcColumn = (
  trackCount: number,
  column: number,
  track: number
): number => {
  if (trackCount == 3 && track === 1) {
    return column + trackCount - track + 2;
  }
  return column + trackCount - track + (track <= trackCount ? 1 : 0);
};

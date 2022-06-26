export type TrainTimetable = TimetableRecord[];

export type TimetableRecord = {
  line: "keio" | "toei";
  staId: number;
  staName: string;
  arrTime?: string;
  depTime?: string;
};

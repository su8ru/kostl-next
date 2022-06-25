// Generated by https://quicktype.io

export interface Body {
  up: Up[];
  TS?: TS[];
  TB?: TB[];
}

export interface TB {
  id: string;
  sn: Sn;
  ps: P[];
}

export interface TS {
  id: string;
  sn: Sn;
  ps: P[];
}

interface P {
  tr: string;
  sy: string;
  sy_tr: string;
  ki: string;
  bs: string;
  dl: string;
  ik: string;
  ik_tr: string;
  inf: string;
  sr: string;
}

type Sn = "I" | "K" | "S";

interface Up {
  dt: Dt[];
  st: string;
}

export interface Dt {
  yy: string;
  mt: string;
  dy: string;
  hh: string;
  mm: string;
  ss: string;
}

export interface TrainTimetable {
  dy: Dy[];
}

export interface Dy {
  st: string;
  sn: string;
  tt: string;
  pp: string;
}

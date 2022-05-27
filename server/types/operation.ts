export type Operation = { id: string; trains: TrainWithInfo[] };

export type TrainWithInfo = {
  id: string;
  depTime: string;
  depSta: string;
  arrSta: string;
  typeChange?: TypeChange[];
};

export type TypeChange = {
  changeStation: string;
  changeType: string;
};

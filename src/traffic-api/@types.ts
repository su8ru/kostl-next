export type TrainDirection = "East" | "West";

export type Train = {
  id: string;
  type: string;
  direction: TrainDirection;
  delay: number;
  dest: string;
  length: number | null;
  section: Section;
};

export type Section = {
  id: number;
  type: "Sta" | "Way" | "WayB";
  track: number;
};

export type TrafficResponse = {
  fromKV: boolean;
  timestamp: string;
  trains: Train[];
};

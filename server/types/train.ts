export type TrainDirection = "East" | "West";

export type Train = {
  id: string;
  type: string;
  direction: TrainDirection;
  delay: number;
  dest: string;
  length: number | null;
  section: Section;
  typeChanges?: TypeChange[];
};

export type TypeChange = {
  type: string;
  dest: string;
};

export type SectionType = "Sta" | "Way" | "WayB";

export type Section = {
  id: number;
  type: SectionType;
  track: number;
};

export type Traffic = {
  timestamp: string;
  trains: Train[];
};

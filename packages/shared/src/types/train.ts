export type TrainDirection = "East" | "West";

export type Train = {
  id: string;
  type: string;
  direction: TrainDirection;
  operationId: string | null;
  delay: number;
  dest: string;
  carCount: number | null;
  unitId: string | null;
  section: Section;
  typeChanges?: TypeChange[];
};

export type TypeChange = {
  sta: string;
  type: string;
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

import Train from "~/components/Train";
import { TrainDirection, Train as TrainType } from "@kostl/shared/types/train";

type SectionType = "Sta" | "Way";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface Props {
  gridArea: string;
  type: SectionType;
  trains: TrainType[];
}

const Section: React.VFC<Props> = ({ gridArea, type, trains }) => {
  const direction = flexDirection[type][trains[0].direction];
  const justify = justifyContent[type];
  const align = alignItems[trains[0].direction];

  return (
    <div
      style={{
        alignItems: align,
        display: "flex",
        flexDirection: direction,
        gap: "4px",
        gridArea,
        justifyContent: justify,
        padding: "2px",
      }}
    >
      {trains.map((train) => (
        <Train key={train.id} train={train} />
      ))}
    </div>
  );
};

const flexDirection: {
  [key in SectionType]: { [key in TrainDirection]: FlexDirection };
} = {
  Sta: {
    East: "row-reverse",
    West: "row",
  },
  Way: {
    East: "column",
    West: "column-reverse",
  },
} as const;

const justifyContent: {
  [key in SectionType]: "flex-start" | "center";
} = {
  Sta: "flex-start",
  Way: "center",
} as const;

const alignItems: {
  [key in TrainDirection]: "flex-end" | "flex-start";
} = {
  East: "flex-end",
  West: "flex-start",
} as const;

export default Section;

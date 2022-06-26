import { Stack, StackDirection } from "@chakra-ui/react";
import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import { TrainDirection, Train as TrainType } from "$/types/train";
import Train from "~/components/Train";
import * as CSS from "csstype";

type SectionType = "Sta" | "Way";

export interface Props {
  gridArea: string;
  type: SectionType;
  trains: TrainType[];
}

const Section: React.VFC<Props> = ({ gridArea, type, trains }) => {
  return (
    <Stack
      gridArea={gridArea}
      direction={flexDirection[type][trains[0].direction]}
      justifyContent={justifyContent[type]}
      alignItems={alignItems[trains[0].direction]}
      spacing="4px"
      p="2px"
    >
      {trains.map((train) => (
        <Train key={train.id} train={train} />
      ))}
    </Stack>
  );
};

const flexDirection: {
  [key in SectionType]: { [key in TrainDirection]: StackDirection };
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
  [key in SectionType]: Token<CSS.Property.JustifyContent>;
} = {
  Sta: "flex-start",
  Way: "center",
} as const;

const alignItems: {
  [key in TrainDirection]: Token<CSS.Property.AlignItems>;
} = {
  East: "flex-end",
  West: "flex-start",
} as const;

export default Section;

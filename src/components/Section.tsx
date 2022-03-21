import { Train as TrainType } from "$/types/train";
import { Stack } from "@chakra-ui/react";
import Train from "~/components/Train";

export interface Props {
  gridArea: string;
  trains: TrainType[];
}

const Section: React.VFC<Props> = ({ gridArea, trains }) => {
  return (
    <Stack
      gridArea={gridArea}
      direction={trains[0].direction === "East" ? "column" : "column-reverse"}
      justifyContent="center"
      spacing="4px"
      m="2px"
    >
      {trains.map((train) => (
        <Train key={train.id} train={train} />
      ))}
    </Stack>
  );
};

export default Section;

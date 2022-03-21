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
      alignItems={trains[0].direction === "East" ? "flex-end" : "flex-start"}
      spacing="4px"
      p="2px"
    >
      {trains.map((train) => (
        <Train key={train.id} train={train} />
      ))}
    </Stack>
  );
};

export default Section;

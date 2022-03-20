import { Train as TrainType } from "~/traffic-api/@types";
import { Flex } from "@chakra-ui/react";
import Train from "~/components/Train";

export interface Props {
  gridArea: string;
  trains: TrainType[];
}

const Section: React.VFC<Props> = ({ gridArea, trains }) => {
  return (
    <Flex gridArea={gridArea} direction="column">
      {trains.map((train) => (
        <Train key={train.id} train={train} />
      ))}
    </Flex>
  );
};

export default Section;

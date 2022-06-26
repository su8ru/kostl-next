import { Box } from "@chakra-ui/react";
import { Train } from "$/types/train";
import TrainTimetable from "~/components/trainDetails/TrainTimetable";

export type Props = {
  train: Train;
};

const TrainDetailsBody: React.VFC<Props> = ({ train }) => {
  return (
    <Box p="4">
      <TrainTimetable train={train} />
    </Box>
  );
};

export default TrainDetailsBody;

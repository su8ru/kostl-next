import { Box } from "@chakra-ui/react";
import TrainTimetable from "~/components/trainDetails/TrainTimetable";
import { Train } from "@kostl/shared/types/train";

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

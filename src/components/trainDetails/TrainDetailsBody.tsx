import { Box } from "@chakra-ui/react";
import { Train } from "$/types/train";

export type Props = {
  train: Train;
};

const TrainDetailsBody: React.VFC<Props> = ({ train }) => {
  return <Box p="4">lol</Box>;
};

export default TrainDetailsBody;

import { Train } from "~/traffic-api/@types";
import { Flex, Text } from "@chakra-ui/react";

export interface Props {
  train: Train;
}

const Train: React.VFC<Props> = ({ train: { id, dest } }) => {
  return (
    <Flex direction="column">
      <Text>{id}</Text>
      <Text>{dest}</Text>
    </Flex>
  );
};

export default Train;

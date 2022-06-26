import { typeColorList } from "~/utils/colors";
import { trainTypeDict } from "$/service/data";
import { Text } from "@chakra-ui/react";

export type Props = {
  type: number;
};

const TrainTypeSm: React.VFC<Props> = ({ type }) => (
  <Text
    w="16"
    textAlign="center"
    bgColor={typeColorList[type]}
    borderRadius="base"
    color="#fff"
    as="span"
    display="inline-block"
    mx="2"
  >
    {trainTypeDict[type]}
  </Text>
);

export default TrainTypeSm;

import { Flex, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BsArrowRepeat } from "react-icons/bs";

export interface Props {
  timestamp?: string;
  gridArea?: string;
}

const UpdateTime: React.VFC<Props> = ({ timestamp, gridArea }) => (
  <Flex gridArea={gridArea} justifyContent="flex-end" alignItems="center">
    <HStack mb="8">
      <BsArrowRepeat />
      <Text>
        {timestamp
          ? dayjs(timestamp).format("YYYY.MM.DD HH:mm:ss")
          : "Loading..."}
      </Text>
    </HStack>
  </Flex>
);

export default UpdateTime;

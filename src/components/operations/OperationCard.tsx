import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Box, Flex, Text } from "@chakra-ui/react";
import { simpleStationNameDict } from "$/service/data";
import { Operation } from "$/types/operation";

export type Props = {
  operation: Operation;
};

const OperationCard: React.VFC<Props> = ({ operation: { id, trains } }) => {
  return (
    <Box m="2">
      <Text align="center" fontSize="md">
        {id}
      </Text>
      <Box mt="2">
        {trains.map(({ id, depSta, arrSta, depTime }) => (
          <Flex key={id}>
            <Text w="14" align="center">
              {simpleStationNameDict[parseInt(id) % 2 ? arrSta : depSta]}
            </Text>
            <Text w="12" align="right">
              {parseInt(id) % 2 ? "" : depTime}
            </Text>
            <Text mt="1" mx="4">
              {parseInt(id) % 2 ? <BsArrowLeft /> : <BsArrowRight />}
            </Text>
            <Text w="14" align="center">
              {simpleStationNameDict[parseInt(id) % 2 ? depSta : arrSta]}
            </Text>
            <Text w="12" align="right">
              {parseInt(id) % 2 ? depTime : ""}
            </Text>
            <Text w="14" align="right" ml="2">
              {id}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default OperationCard;

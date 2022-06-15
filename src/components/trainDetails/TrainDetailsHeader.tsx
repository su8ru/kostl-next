import { Train } from "$/types/train";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import TrainType from "~/components/trainDetails/TrainType";
import { fullStationNameList } from "$/service/data";

export type Props = {
  train: Train;
};

const TrainDetailsHeader: React.VFC<Props> = ({ train }) => {
  return (
    <Box mt="4">
      <Flex fontSize="md" justifyContent="center" alignItems="center" mb="2">
        <Text>
          {train.id} {!/^\d+[TK]$/.test(train.id) && "ﾚ"}
        </Text>
        <Divider mx="2" orientation="vertical" height="4" />
        <TrainType type={+train.type} />
        <Text fontWeight="500">
          {fullStationNameList[getFinalDest(train)] ?? "（情報無し）"} 行
        </Text>
      </Flex>
      <Flex fontSize="md" justifyContent="center" alignItems="center" mb="2">
        {train.operationId && <Text>{train.operationId}</Text>}
        {train.unitId && <Text ml="2">{train.unitId}</Text>}
        {(train.operationId || train.unitId) && train.carCount && (
          <Divider mx="2" orientation="vertical" height="4" />
        )}
        {train.carCount && <Text>{train.carCount}両編成</Text>}
      </Flex>
    </Box>
  );
};

export default TrainDetailsHeader;

const getFinalDest = (train: Train) => {
  const { dest, typeChanges } = train;
  const finalTypeChange = [...(typeChanges ?? [])].pop();
  return finalTypeChange?.dest ?? dest;
};

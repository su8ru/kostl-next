import { BsXLg } from "react-icons/bs";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { fullStationNameDict } from "$/service/data";
import { Train } from "$/types/train";
import TrainType from "~/components/trainDetails/TrainType";
import TrainTypeSm from "~/components/trainDetails/TrainTypeSm";

export type Props = {
  train: Train;
  onDismiss: () => void;
};

const TrainDetailsHeader: React.VFC<Props> = ({ train, onDismiss }) => {
  const typeChanges = getTypeChanges(train);

  return (
    <Box mt="4" position="relative">
      <Box
        position="absolute"
        p="2"
        w="8"
        h="8"
        right="0"
        top="-6"
        onClick={onDismiss}
        cursor="pointer"
      >
        <Icon as={BsXLg} color="gray" />
      </Box>
      <Flex fontSize="md" justifyContent="center" alignItems="center">
        <TrainType type={+train.type} />
        <Text fontWeight="500">
          <Text as="span" fontSize="md" fontWeight="500">
            {fullStationNameDict[getFinalDest(train)] ?? "（情報無し）"}
          </Text>
          <Text as="span" fontSize="xs" ml="1">
            行き
          </Text>
        </Text>
        {train.carCount && (
          <>
            <Divider mx="2" orientation="vertical" height="4" />
            <Text>
              <Text as="span" fontWeight="500" fontSize="lg">
                {train.carCount}
              </Text>
              <Text as="span" fontSize="xs" ml="1">
                両編成
              </Text>
            </Text>
          </>
        )}
      </Flex>
      {!!typeChanges.length && (
        <Flex justifyContent="center" mt="1.5">
          <Box fontSize="sm">
            {typeChanges.map(({ sta, type }, index) => (
              <Box key={index} my="1">
                {fullStationNameDict[sta]}から
                <TrainTypeSm type={+type} />
                {fullStationNameDict[getFinalDest(train)] ?? "（情報無し）"} 行
              </Box>
            ))}
          </Box>
        </Flex>
      )}
      <Flex fontSize="md" justifyContent="center" alignItems="center" mt="2">
        <Text>
          {train.id} {!/^\d+[TK]$/.test(train.id) && "ﾚ"}
        </Text>
        {train.operationId && (
          <Divider ml="2" orientation="vertical" height="4" />
        )}
        {train.operationId && <Text ml="2">{train.operationId}</Text>}
        {train.unitId && <Text ml="2">{train.unitId}</Text>}
        {train.delay > 0 && (
          <>
            <Divider mx="2" orientation="vertical" height="4" />
            <Text color="red">
              <Text as="span" fontSize="lg" fontWeight="500">
                {train.delay}
              </Text>
              <Text as="span" fontSize="xs" ml="1">
                分遅れ
              </Text>
            </Text>
          </>
        )}
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

const getTypeChanges = (train: Train): { sta: string; type: string }[] => {
  const { dest, typeChanges } = train;
  if (!typeChanges) return [];
  return typeChanges.map((curr, index, arr) => {
    if (index === 0) return { sta: dest, type: curr.type };
    return {
      sta: arr[index - 1].dest,
      type: curr.type,
    };
  });
};

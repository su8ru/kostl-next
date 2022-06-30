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
  const { id, type, dest, operationId, delay, typeChanges, carCount, unitId } =
    train;

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
        <TrainType type={+type} />
        <Text fontWeight="500">
          <Text as="span" fontSize="md" fontWeight="500">
            {fullStationNameDict[dest] ?? "（情報無し）"}
          </Text>
          <Text as="span" fontSize="xs" ml="1">
            行き
          </Text>
        </Text>
        {carCount && (
          <>
            <Divider mx="2" orientation="vertical" height="4" />
            <Text>
              <Text as="span" fontWeight="500" fontSize="lg">
                {carCount}
              </Text>
              <Text as="span" fontSize="xs" ml="1">
                両編成
              </Text>
            </Text>
          </>
        )}
      </Flex>
      {typeChanges && typeChanges.length > 0 && (
        <Flex justifyContent="center" mt="1.5">
          <Box fontSize="sm">
            {typeChanges.map(({ sta, type }, index) => (
              <Box key={index} my="1">
                {fullStationNameDict[sta]}から
                <TrainTypeSm type={+type} />
                {fullStationNameDict[dest] ?? "（情報無し）"} 行
              </Box>
            ))}
          </Box>
        </Flex>
      )}
      <Flex fontSize="md" justifyContent="center" alignItems="center" mt="2">
        <Text>
          {id} {!/^\d+[TK]$/.test(id) && "ﾚ"}
        </Text>
        {operationId && <Divider ml="2" orientation="vertical" height="4" />}
        {operationId && <Text ml="2">{operationId}</Text>}
        {unitId && <Text ml="2">{unitId}</Text>}
        {delay > 0 && (
          <>
            <Divider mx="2" orientation="vertical" height="4" />
            <Text color="#cf167c">
              <Text as="span" fontSize="lg" fontWeight="500">
                {delay}
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

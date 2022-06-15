import { Box, Flex } from "@chakra-ui/react";
import { fullStationNameList } from "$/service/data";
import { Train } from "$/types/train";
import TrainTypeSm from "~/components/trainDetails/TrainTypeSm";

export type Props = {
  train: Train;
};

const TrainDetails: React.VFC<Props> = ({ train }) => {
  const typeChanges = getTypeChanges(train);

  return (
    <Box p="4">
      {!!typeChanges.length && (
        <Flex justifyContent="center" mb="1">
          <Box fontSize="sm">
            {typeChanges.map(({ sta, type }, index) => (
              <Box key={index} my="1">
                {fullStationNameList[sta]}から
                <TrainTypeSm type={+type} />
                {fullStationNameList[getFinalDest(train)] ?? "（情報無し）"} 行
              </Box>
            ))}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

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

export default TrainDetails;

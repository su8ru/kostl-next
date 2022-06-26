import { Train } from "$/types/train";
import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NumberingIcon from "~/components/trainDetails/NumberingIcon";

export type Props = {
  train: Train;
};

const TrainTimetable: React.VFC<Props> = ({ train }) => {
  const { data, error } = useAspidaSWR(
    apiClient.trainTimetable._trainId(train.id)
  );

  if (data)
    return (
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ line, staId, staName, arrTime, depTime }) => (
              <Tr key={staName}>
                <Td alignItems="center">
                  <Flex gap={2} alignItems="center">
                    <NumberingIcon
                      line={line}
                      id={`${staId}`.padStart(2, "0")}
                      w={5}
                      h={5}
                    />
                    <Text>{staName}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Box h="4">{arrTime && <Text>{arrTime} 着</Text>}</Box>
                  <Box h="4">{depTime && <Text>{depTime} 発</Text>}</Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );

  if (error)
    <Box>
      <Text>列車時刻表がみつかりませんでした。</Text>
    </Box>;

  return null;
};

export default TrainTimetable;

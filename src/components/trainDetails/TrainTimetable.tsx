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
import { Train } from "$/types/train";
import NumberingIcon from "~/components/trainDetails/NumberingIcon";
import { apiClient } from "~/utils/apiClient";
import useAspidaSWR from "@aspida/swr";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
              <Th>停車駅</Th>
              <Th>定刻</Th>
              {train.delay > 0 && <Th>見込</Th>}
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
                <Td color={train.delay > 0 ? "gray" : undefined}>
                  <Box h="4">{arrTime && <Text>{arrTime} 着</Text>}</Box>
                  <Box h="4">{depTime && <Text>{depTime} 発</Text>}</Box>
                </Td>
                {train.delay > 0 && (
                  <>
                    <Td>
                      <Box h="4">
                        {arrTime && (
                          <Text>{estimatedTime(arrTime, train.delay)}着</Text>
                        )}
                      </Box>
                      <Box h="4">
                        {depTime && (
                          <Text>{estimatedTime(depTime, train.delay)}発</Text>
                        )}
                      </Box>
                    </Td>
                  </>
                )}
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

const estimatedTime = (time: string, delay: number): string =>
  dayjs(time, "HH:mm").add(delay, "m").format("HH:mm");

export default TrainTimetable;

import { UnitPost } from "$/types/unit";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";
import { operationCompareFn } from "~/utils/compareFn";

export type Props = {
  unitPosts: UnitPost[];
};

const OperationsUnitPostsList: React.VFC<Props> = ({ unitPosts }) => {
  const { data: calendar } = useAspidaSWR(apiClient.calendar);
  const { data: operations } = useAspidaSWR(apiClient.operations);
  const validPosts = unitPosts.filter(({ disabledAt }) => disabledAt === null);

  if (!calendar || !operations) return null;

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>運用番号</Th>
          <Th>編成番号</Th>
          <Th>投稿日時</Th>
        </Tr>
      </Thead>
      <Tbody>
        {operations[
          (calendar.day?.toLowerCase() as "weekday" | "holiday") ?? "weekday"
        ]
          .sort(operationCompareFn)
          .map(({ id }) => {
            const unitPost = validPosts.find(
              ({ operationId }) => operationId === id
            );
            return (
              <Tr key={id}>
                <Td>{id}</Td>
                <Td>{unitPost?.unitId ?? "-"}</Td>
                <Td>
                  {unitPost
                    ? dayjs(unitPost.createdAt).format("M/D HH:mm:ss")
                    : "-"}
                </Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default OperationsUnitPostsList;

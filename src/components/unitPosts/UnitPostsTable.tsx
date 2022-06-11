import { UnitPost } from "$/types/unit";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";

export type Props = {
  unitPosts: UnitPost[];
};

const UnitPostsTable: React.VFC<Props> = ({ unitPosts }) => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>運用番号</Th>
          <Th>編成番号</Th>
          <Th>投稿日時</Th>
          <Th>削除・無効化日時</Th>
        </Tr>
      </Thead>
      <Tbody>
        {unitPosts.map(({ id, operationId, unitId, createdAt, disabledAt }) => (
          <Tr key={id} bgColor={disabledAt ? "blackAlpha.100" : "white"}>
            <Td>{operationId}</Td>
            <Td>{unitId}</Td>
            <Td>{dayjs(createdAt).format("M/D HH:mm:ss")}</Td>
            <Td>
              {disabledAt ? dayjs(disabledAt).format("M/D HH:mm:ss") : "-"}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UnitPostsTable;

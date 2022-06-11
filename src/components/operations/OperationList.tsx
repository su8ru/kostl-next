import { Operation } from "$/types/operation";
import OperationCard from "~/components/operations/OperationCard";
import { Flex } from "@chakra-ui/react";
import { operationCompareFn } from "~/utils/compareFn";

type Props = {
  operations: Operation[];
};

const OperationList: React.VFC<Props> = ({ operations }) => {
  return (
    <Flex wrap="wrap">
      {operations.sort(operationCompareFn).map((operation) => (
        <OperationCard operation={operation} key={operation.id} />
      ))}
    </Flex>
  );
};

export default OperationList;

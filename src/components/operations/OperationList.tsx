import { Operation } from "$/types/operation";
import OperationCard from "~/components/operations/OperationCard";
import { Flex } from "@chakra-ui/react";

type Props = {
  operations: Operation[];
};

const OperationList: React.VFC<Props> = ({ operations }) => {
  return (
    <Flex wrap="wrap">
      {operations
        .sort(({ id: idA }, { id: idB }) => {
          const typeA = operationIdToType(idA);
          const typeB = operationIdToType(idB);
          if (typeA !== typeB) {
            switch (typeA) {
              case "T":
                return -1;
              case "K":
                return typeB === "T" ? 1 : -1;
              case "N":
                return 1;
            }
          }
          const numA = parseInt(idA);
          const numB = parseInt(idB);
          return numA - numB;
        })
        .map((operation) => (
          <OperationCard operation={operation} key={operation.id} />
        ))}
    </Flex>
  );
};

const operationIdToType = (id: string): "T" | "K" | "N" => {
  const char = id.slice(-1);
  if (char === "T" || char === "K") return char;
  return "N";
};

export default OperationList;

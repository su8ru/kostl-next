import { Operation } from "$/types/operation";

export const operationCompareFn: (A: Operation, B: Operation) => number = (
  { id: idA },
  { id: idB }
) => {
  const typeA = _operationIdToType(idA);
  const typeB = _operationIdToType(idB);
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
};

const _operationIdToType = (id: string): "T" | "K" | "N" => {
  const char = id.slice(-1);
  if (char === "T" || char === "K") return char;
  return "N";
};

import { Flex, Text } from "@chakra-ui/react";
import { Train } from "$/types/train";
import { destListKeio } from "$/service/data";

export interface Props {
  train: Train;
}

const Train: React.VFC<Props> = ({
  train: { id, type, dest, delay, direction },
}) => {
  return (
    <Flex
      alignItems="center"
      direction={direction === "East" ? "column" : "column-reverse"}
    >
      <Flex
        alignItems="center"
        w="50px"
        color="#fff"
        fontWeight="500"
        py="1"
        border="2px"
        borderColor="#fff"
        boxShadow="base"
        direction={direction === "East" ? "column" : "column-reverse"}
        bg={typeColorList[+type]}
        borderTopRadius={direction === "East" ? "md" : "sm"}
        borderBottomRadius={direction === "East" ? "sm" : "md"}
      >
        <Text fontSize="sm">{id}</Text>
        <Text fontSize="sm">{destListKeio[dest] ?? "-"}</Text>
      </Flex>
      {delay > 0 && (
        <Text color="#cf167c" fontWeight="900" fontSize="sm">
          + {delay}
        </Text>
      )}
    </Flex>
  );
};

export default Train;

const typeColorList: { [key: number]: string } = {
  1: "#cf167c",
  2: "#05B08D",
  3: "#0F4E8C",
  4: "#F79328",
  5: "#D3C427",
  6: "#808285",
  7: "#808285",
  8: "#808285",
  9: "linear-gradient(90deg, #d5007f 0%, #d5007f 10%, #000 10%, #000 90%, #d5007f 90%, #d5007f 100%)",
  10: "#808285",
  11: "#57A100",
};

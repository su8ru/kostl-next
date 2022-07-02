import { Box, Flex } from "@chakra-ui/react";

interface Props {
  gridArea: string;
  align: "top" | "bottom";
  round: "left" | "right";
}

const LineBorderX: React.VFC<Props> = ({ gridArea, align, round }) => {
  return (
    <Flex
      alignItems={`flex-${align === "top" ? "start" : "end"}`}
      gridArea={gridArea}
      h="100%"
    >
      <Box
        bg="#cf167c"
        w="100%"
        h="6px"
        mr={round === "right" ? "2px" : 0}
        ml={round === "left" ? "2px" : 0}
        borderBottomRightRadius={
          align === "top" && round === "right" ? "6px" : 0
        }
        borderTopRightRadius={
          align === "bottom" && round === "right" ? "6px" : 0
        }
        borderBottomLeftRadius={align === "top" && round === "left" ? "6px" : 0}
        borderTopLeftRadius={align === "bottom" && round === "left" ? "6px" : 0}
      />
    </Flex>
  );
};

export default LineBorderX;

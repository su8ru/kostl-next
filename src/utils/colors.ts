import { useColorModeValue } from "@chakra-ui/react";

export const typeColorList: Record<number, string> = {
  1: "#cf167c",
  2: "#05b08d",
  3: "#0f4e8c",
  4: "#f79328",
  5: "#d3c427",
  6: "#808285",
  7: "#808285",
  8: "#808285",
  9: "#d5007f",
  10: "#808285",
  11: "#57a100",
};

export const useBgColor = () => {
  const bgColor = useColorModeValue("#fff", "#000");
  return bgColor;
};

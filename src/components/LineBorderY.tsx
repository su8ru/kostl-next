import { Box } from "@chakra-ui/react";

interface Props {
  gridArea: string;
  color?: "keio" | "toei";
}

const bgColor = {
  keio: "#cf167c",
  toei: "#7eb500",
} as const;

const LineBorderY: React.VFC<Props> = ({ gridArea, color }) => (
  <Box gridArea={gridArea} bg="#fff">
    <Box bg={bgColor[color ?? "keio"]} w="6px" mx="2px" h="100%" />
  </Box>
);

export default LineBorderY;

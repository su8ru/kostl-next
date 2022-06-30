import { Box } from "@chakra-ui/react";
import { useBgColor } from "~/utils/colors";

interface Props {
  gridArea: string;
  color?: "keio" | "toei";
}

const color = {
  keio: "#cf167c",
  toei: "#7eb500",
} as const;

const LineBorderY: React.VFC<Props> = ({ gridArea, color: key }) => {
  const bgColor = useBgColor();

  return (
    <Box gridArea={gridArea} bg={bgColor}>
      <Box bg={color[key ?? "keio"]} w="6px" mx="2px" h="100%" />
    </Box>
  );
};

export default LineBorderY;

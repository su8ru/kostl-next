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
  <Box
    gridArea={gridArea}
    bg={bgColor[color ?? "keio"]}
    borderX="2px"
    borderColor="#fff"
  />
);

export default LineBorderY;

import { Box } from "@chakra-ui/react";

interface Props {
  gridArea: string;
}

const LineBorderY: React.VFC<Props> = ({ gridArea }) => (
  <Box gridArea={gridArea} bg="#cf167c" borderX="2px" borderColor="#fff" />
);

export default LineBorderY;

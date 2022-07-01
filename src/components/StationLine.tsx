import { Box } from "@chakra-ui/react";
import { useLightGray } from "~/utils/colors";

const StationLine: React.VFC = () => {
  const color = useLightGray();
  return <Box bg={color} h="6px" w="100%" />;
};

export default StationLine;

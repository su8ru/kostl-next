import { Box, Theme, useColorModeValue, useTheme } from "@chakra-ui/react";

const StationLine: React.VFC = () => {
  const theme = useTheme<Theme>();
  const color = useColorModeValue(
    theme.colors.blackAlpha["50"],
    theme.colors.whiteAlpha["200"]
  );
  return <Box bg={color} h="8px" w="100%" />;
};

export default StationLine;

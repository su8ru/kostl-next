import { Box, Theme, useColorModeValue, useTheme } from "@chakra-ui/react";

const StationLine: React.VFC = () => {
  const theme = useTheme<Theme>();
  const color = useColorModeValue(
    theme.colors.gray["100"],
    theme.colors.gray["900"]
  );
  return <Box bg={color} h="6px" w="100%" />;
};

export default StationLine;

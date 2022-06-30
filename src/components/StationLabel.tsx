import {
  Flex,
  Text,
  Theme,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";

interface Props {
  name: string;
  gridArea: string;
}

const StationLabel: React.VFC<Props> = ({ name, gridArea }) => {
  const theme = useTheme<Theme>();
  const color = useColorModeValue(
    theme.colors.blackAlpha["700"],
    theme.colors.whiteAlpha["800"]
  );
  return (
    <Flex gridArea={gridArea} alignItems="center">
      <Flex h="42px" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="500" color={color}>
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default StationLabel;

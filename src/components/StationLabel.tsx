import { Flex, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  gridArea: string;
}

const StationLabel: React.VFC<Props> = ({ name, gridArea }) => {
  return (
    <Flex gridArea={gridArea} alignItems="center">
      <Flex h="42px" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="500" color="gray">
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default StationLabel;

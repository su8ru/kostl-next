import { Flex, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  gridArea: string;
}

const StationLabel: React.VFC<Props> = ({ name, gridArea }) => {
  return (
    <Flex gridArea={gridArea} alignItems="center">
      <Text fontSize="sm" fontWeight="500" mb="8" color="gray">
        {name}
      </Text>
    </Flex>
  );
};

export default StationLabel;

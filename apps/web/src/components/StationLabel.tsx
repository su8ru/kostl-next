import { Flex, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  gridArea: string;
  alignCenter?: boolean;
}

const StationLabel: React.VFC<Props> = ({ name, gridArea, alignCenter }) => {
  return (
    <Flex
      gridArea={gridArea}
      alignItems="center"
      justifyContent={alignCenter ? "center" : "flex-start"}
    >
      <Flex h="42px" alignItems={alignCenter ? "center" : "flex-start"}>
        <Text fontSize="sm" fontWeight="500" color="gray.500">
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default StationLabel;

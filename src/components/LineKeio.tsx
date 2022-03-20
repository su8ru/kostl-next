import useAspidaSWR from "@aspida/swr";
import { trafficApiClient } from "~/utils/apiClient";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { getGridAreaKeio } from "~/utils/gridArea";
import { groupBySection } from "~/utils/groupBySection";
import { useMemo } from "react";

const LineKeio: React.VFC = () => {
  const { data, error } = useAspidaSWR(trafficApiClient.keio, {
    refreshInterval: 5000,
  });

  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaKeio) : []),
    [data?.trains]
  );

  if (!data) return <Text>Loading...</Text>;

  return (
    <SimpleGrid
      templateRows="repeat(77, minmax(24px, auto))"
      templateColumns="50px 10px 50px 50px 10px 50px 50px 10px 50px 10px 50px 10px 50px 50px 10px 50px 50px 10px 50px"
    >
      {sections.map(([gridArea, trains]) => (
        <Box key={gridArea} gridArea={gridArea}>
          {trains.map(({ id }) => (
            <Box>{id}</Box>
          ))}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default LineKeio;

import useAspidaSWR from "@aspida/swr";
import { trafficApiClient } from "~/utils/apiClient";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { getGridAreaKeio } from "~/utils/gridArea";
import { groupBySection } from "~/utils/groupBySection";
import { useMemo } from "react";
import Section from "~/components/Section";

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
        <Section key={gridArea} gridArea={gridArea} trains={trains} />
      ))}
    </SimpleGrid>
  );
};

export default LineKeio;

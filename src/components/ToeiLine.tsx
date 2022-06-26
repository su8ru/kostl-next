import useAspidaSWR from "@aspida/swr";
import { allToeiStationsJa } from "$/service/data";
import { apiClient } from "~/utils/apiClient";
import { useMemo } from "react";
import { useAtom } from "jotai";
import { trainBoxHeightAtom } from "~/atoms";
import { groupBySection } from "~/utils/groupBySection";
import { getGridAreaToei } from "~/utils/gridArea";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import Section from "~/components/Section";
import LineBorderY from "~/components/LineBorderY";
import StationLabel from "~/components/StationLabel";
import UpdateTime from "~/components/UpdateTime";

const ToeiLine: React.VFC = () => {
  const { data } = useAspidaSWR(apiClient.traffic._key("toei"), {
    refreshInterval: 5000,
  });
  const [trainHeight] = useAtom(trainBoxHeightAtom);

  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaToei) : []),
    [data?.trains]
  );

  return (
    <SimpleGrid
      templateRows={`repeat(40, minmax(${trainHeight}px, auto))`}
      templateColumns="90px 10px 58px 58px 10px 58px 58px 10px 58px 10px 58px 10px 58px 58px 10px 58px 58px 10px 90px"
    >
      {[...Array(20)].map((_, index) => (
        <Flex
          key={index}
          gridArea={`${index * 2 + 1} / 1 / ${index * 2 + 2} / 20`}
          alignItems="center"
        >
          <Box bg="#f5f5f5" h="8px" w="100%" />
        </Flex>
      ))}

      <LineBorderY gridArea="1 / 10 / 41 / 11" color="toei" />

      {sections.map(([gridArea, trains]) => (
        <Section
          key={gridArea}
          gridArea={gridArea}
          type={trains[0].section.type === "Sta" ? "Sta" : "Way"}
          trains={trains}
        />
      ))}

      <UpdateTime timestamp={data?.timestamp} gridArea="1 / 16 / 2 / 20" />

      {allToeiStationsJa
        .slice(1)
        .reverse()
        .map((name, index) => (
          <StationLabel
            key={index}
            name={name}
            gridArea={`${index * 2 + 1} / 5 / ${index * 2 + 2} / 8`}
          />
        ))}
    </SimpleGrid>
  );
};

export default ToeiLine;

import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";
import { useMemo } from "react";
import { groupBySection } from "~/utils/groupBySection";
import { getGridAreaToei } from "~/utils/gridArea";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import Section from "~/components/Section";
import LineBorderY from "~/components/LineBorderY";
import StationLabel from "~/components/StationLabel";

const ToeiLine: React.VFC = () => {
  const { data } = useAspidaSWR(apiClient.traffic._key("toei"), {
    refreshInterval: 5000,
  });

  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaToei) : []),
    [data?.trains]
  );

  return (
    <SimpleGrid
      templateRows="repeat(40, minmax(58px, auto))"
      templateColumns="130px 10px 54px 54px 10px 54px 54px 10px 54px 10px 54px 10px 54px 54px 10px 54px 54px 10px 130px"
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

      {stations.map((name, index) => (
        <StationLabel
          key={index}
          name={name}
          gridArea={`${index * 2 + 1} / 1`}
        />
      ))}
    </SimpleGrid>
  );
};

export default ToeiLine;

const stations = [
  "本八幡",
  "篠崎",
  "瑞江",
  "一之江",
  "船堀",
  "東大島",
  "大島",
  "西大島",
  "住吉",
  "菊川",
  "森下",
  "浜町",
  "馬喰横山",
  "岩本町",
  "小川町",
  "神保町",
  "九段下",
  "市ヶ谷",
  "曙橋",
  "新宿三丁目",
] as const;

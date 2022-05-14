import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { getGridAreaKeio } from "~/utils/gridArea";
import { groupBySection } from "~/utils/groupBySection";
import { useMemo } from "react";
import Section from "~/components/Section";
import LineBorderY from "~/components/LineBorderY";
import LineBorderX from "~/components/LineBorderX";
import StationLabel from "~/components/StationLabel";
import UpdateTime from "~/components/UpdateTime";

const KeioLine: React.VFC = () => {
  const { data } = useAspidaSWR(apiClient.traffic._key("keio"), {
    refreshInterval: 5000,
  });

  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaKeio) : []),
    [data?.trains]
  );

  return (
    <SimpleGrid
      templateRows="repeat(77, minmax(50px, auto))"
      templateColumns="90px 10px 58px 58px 10px 58px 58px 10px 58px 10px 58px 10px 58px 58px 10px 58px 58px 10px 90px"
    >
      {[...Array(39)].map((_, index) => (
        <Flex
          key={index}
          gridArea={`${index * 2 + 1} / 1 / ${index * 2 + 2} / 20`}
          alignItems="center"
        >
          <Box bg="#f5f5f5" h="8px" w="100%" />
        </Flex>
      ))}

      <LineBorderY gridArea="1 / 5 / 68 / 6" />
      <LineBorderY gridArea="1 / 10 / 7 / 11" />
      <LineBorderY gridArea="45 / 10 / 48 / 11" />
      <LineBorderY gridArea="55 / 10 / 58 / 11" />
      <LineBorderY gridArea="36 / 15 / 58 / 16" />
      <LineBorderY gridArea="66 / 15 / 78 / 16" />
      <LineBorderX gridArea="7 / 9 / 8 / 11" align="top" round="right" />
      <LineBorderX gridArea="35 / 9 / 36 / 16" align="bottom" round="right" />
      <LineBorderX gridArea="44 / 9 / 45 / 11" align="bottom" round="right" />
      <LineBorderX gridArea="58 / 9 / 59 / 11" align="top" round="right" />
      <LineBorderX gridArea="65 / 9 / 66 / 16" align="bottom" round="right" />

      <Box
        gridArea="45 / 9 / 48 / 12"
        boxShadow="inset 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
        borderRadius="md"
        h="calc(100% + 6px)"
        mt="-6px"
      />
      <Box
        gridArea="55 / 9 / 58 / 12"
        boxShadow="inset 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
        borderRadius="md"
        h="calc(100% + 6px)"
      />

      {sections.map(([gridArea, trains]) => (
        <Section
          key={gridArea}
          gridArea={gridArea}
          type={trains[0].section.type === "Sta" ? "Sta" : "Way"}
          trains={trains}
        />
      ))}

      <UpdateTime timestamp={data?.timestamp} gridArea="1 / 16 / 2 / 20" />

      {stationsMain.map((name, index) => (
        <StationLabel
          key={index}
          name={name}
          gridArea={`${index * 2 + 1} / 1`}
        />
      ))}
      {stationsSagami.map((name, index) => (
        <StationLabel
          key={index}
          name={name}
          gridArea={`${index * 2 + 37} / 19`}
        />
      ))}
      {stationsTakao.map((name, index) => (
        <StationLabel
          key={index}
          name={name}
          gridArea={`${index * 2 + 67} / 19`}
        />
      ))}
      <Flex
        alignItems="flex-start"
        justifyContent="center"
        gridArea="48 / 9 / 49 / 12"
      >
        <Text fontSize="sm" fontWeight="500" mt="1" color="gray">
          府中競馬正門前
        </Text>
      </Flex>
      <Flex
        alignItems="flex-end"
        justifyContent="center"
        gridArea="54 / 9 / 55 / 12"
      >
        <Text fontSize="sm" fontWeight="500" mb="1" color="gray">
          多摩動物公園
        </Text>
      </Flex>
    </SimpleGrid>
  );
};

const stationsMain = [
  "新宿",
  "初台",
  "幡ヶ谷",
  "笹塚",
  "代田橋",
  "明大前",
  "下高井戸",
  "桜上水",
  "上北沢",
  "八幡山",
  "芦花公園",
  "千歳烏山",
  "仙川",
  "つつじヶ丘",
  "柴崎",
  "国領",
  "布田",
  "調布",
  "西調布",
  "飛田給",
  "武蔵野台",
  "多磨霊園",
  "東府中",
  "府中",
  "分倍河原",
  "中河原",
  "聖蹟桜ヶ丘",
  "百草園",
  "高幡不動",
  "南平",
  "平山城址公園",
  "長沼",
  "北野",
  "京王八王子 ",
] as const;
const stationsSagami = [
  "京王多摩川",
  "京王稲田堤",
  "京王よみうりランド",
  "稲城",
  "若葉台",
  "京王永山",
  "京王多摩センター",
  "京王堀之内",
  "南大沢",
  "多摩境",
  "橋本",
] as const;
const stationsTakao = [
  "京王片倉",
  "山田",
  "めじろ台",
  "狭間",
  "高尾",
  "高尾山口",
] as const;

export default KeioLine;

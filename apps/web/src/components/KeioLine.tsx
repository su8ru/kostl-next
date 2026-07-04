import { useMemo } from "react";
import { trainBoxHeightAtom } from "~/atoms";
import LineBorderX from "~/components/LineBorderX";
import LineBorderY from "~/components/LineBorderY";
import Section from "~/components/Section";
import StationLabel from "~/components/StationLabel";
import StationLine from "~/components/StationLine";
import UpdateTime from "~/components/UpdateTime";
import { fetchTraffic } from "~/utils/apiClient";
import { getGridAreaKeio } from "~/utils/gridArea";
import { groupBySection } from "~/utils/groupBySection";
import { allKeioStationsJa } from "@kostl/shared/data";
import { useAtom } from "jotai";
import useSWR from "swr";

const KeioLine: React.VFC = () => {
  const { data } = useSWR("traffic:keio", () => fetchTraffic("keio"), {
    refreshInterval: 5000,
  });
  const [trainHeight] = useAtom(trainBoxHeightAtom);
  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaKeio) : []),
    [data?.trains]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(77, minmax(${trainHeight}px, auto))`,
        gridTemplateColumns:
          "90px 10px 58px 58px 10px 58px 58px 10px 58px 10px 58px 10px 58px 58px 10px 58px 58px 10px 90px",
      }}
    >
      {[...Array(39)].map((_, index) => (
        <div
          key={index}
          style={{
            alignItems: "center",
            display: "flex",
            gridArea: `${index * 2 + 1} / 1 / ${index * 2 + 2} / 20`,
          }}
        >
          <StationLine />
        </div>
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

      <div
        style={{
          borderRadius: "var(--chakra-radii-md)",
          boxShadow: "inset 0 2px 6px 0 rgba(0, 0, 0, 0.1)",
          gridArea: "45 / 9 / 48 / 12",
          height: "calc(100% + 6px)",
          marginTop: "-6px",
        }}
      />
      <div
        style={{
          borderRadius: "var(--chakra-radii-md)",
          boxShadow: "inset 0 2px 6px 0 rgba(0, 0, 0, 0.1)",
          gridArea: "55 / 9 / 58 / 12",
          height: "calc(100% + 6px)",
        }}
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
      <StationLabel
        name={allKeioStationsJa[45]}
        gridArea="48 / 9 / 49 / 12"
        alignCenter
      />
      <StationLabel
        name={allKeioStationsJa[46]}
        gridArea="54 / 9 / 55 / 12"
        alignCenter
      />
    </div>
  );
};

const stationsMain = allKeioStationsJa.slice(0, 34);
const stationsSagami = allKeioStationsJa.slice(34, 45);
const stationsTakao = allKeioStationsJa.slice(47, 53);

export default KeioLine;

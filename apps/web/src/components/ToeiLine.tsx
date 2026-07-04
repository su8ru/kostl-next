import { useMemo } from "react";
import { trainBoxHeightAtom } from "~/atoms";
import LineBorderY from "~/components/LineBorderY";
import Section from "~/components/Section";
import StationLabel from "~/components/StationLabel";
import StationLine from "~/components/StationLine";
import UpdateTime from "~/components/UpdateTime";
import { fetchTraffic } from "~/utils/apiClient";
import { getGridAreaToei } from "~/utils/gridArea";
import { groupBySection } from "~/utils/groupBySection";
import { allToeiStationsJa } from "@kostl/shared/data";
import { useAtom } from "jotai";
import useSWR from "swr";

const ToeiLine: React.VFC = () => {
  const { data } = useSWR("traffic:toei", () => fetchTraffic("toei"), {
    refreshInterval: 5000,
  });
  const [trainHeight] = useAtom(trainBoxHeightAtom);

  const sections = useMemo(
    () => (data ? groupBySection(data.trains, getGridAreaToei) : []),
    [data?.trains]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(40, minmax(${trainHeight}px, auto))`,
        gridTemplateColumns:
          "90px 10px 58px 58px 10px 58px 58px 10px 58px 10px 58px 10px 58px 58px 10px 58px 58px 10px 90px",
      }}
    >
      {[...Array(20)].map((_, index) => (
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
    </div>
  );
};

export default ToeiLine;

import { trainItemsSettingAtom, triggerDetailsAtom } from "~/atoms";
import { TrainItem } from "~/types/settings";
import { useKeioPink } from "~/utils/colors";
import {
  capStationNameDict,
  simpleStationNameDict,
  vehicleModelDict,
} from "@kostl/shared/data";
import { Train as TrainType } from "@kostl/shared/types/train";
import { useAtom } from "jotai";

export interface Props {
  train: TrainType;
}

const Train: React.VFC<Props> = ({ train }) => {
  const { id, delay, direction, carCount, vehicleModel } = train;
  const [trainItemsSetting] = useAtom(trainItemsSettingAtom);
  const [triggerDetails] = useAtom(triggerDetailsAtom);
  const keioPink = useKeioPink();

  const itemIdToValue = (itemId: TrainItem): string => {
    switch (itemId) {
      case "trainId":
        return id;
      case "destination":
        return getDest(train);
      case "carCount":
        return carCount !== null ? `${carCount}両` : "-";
      case "vehicleModel":
        return vehicleModel ? vehicleModelDict[vehicleModel] ?? "-" : "-";
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: direction === "East" ? "column" : "column-reverse",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: getType(train),
          border: "2px solid #fff",
          borderBottomLeftRadius:
            direction === "East" ? "0.125rem" : "0.375rem",
          borderBottomRightRadius:
            direction === "East" ? "0.125rem" : "0.375rem",
          borderTopLeftRadius: direction === "East" ? "0.375rem" : "0.125rem",
          borderTopRightRadius: direction === "East" ? "0.375rem" : "0.125rem",
          boxShadow: "var(--chakra-shadows-base)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection: direction === "East" ? "column" : "column-reverse",
          fontWeight: 500,
          paddingBottom: "0.25rem",
          paddingTop: "0.25rem",
          width: "54px",
        }}
        onClick={() => {
          if (triggerDetails) triggerDetails(train);
        }}
      >
        {trainItemsSetting.map((itemId) => (
          <span key={itemId} style={{ fontSize: "var(--chakra-fontSizes-sm)" }}>
            {itemIdToValue(itemId)}
          </span>
        ))}
      </div>
      {delay > 0 && (
        <span
          style={{
            color: keioPink,
            fontSize: "var(--chakra-fontSizes-sm)",
            fontWeight: 900,
          }}
        >
          + {delay}
        </span>
      )}
    </div>
  );
};

export default Train;

const getDest = ({ dest, typeChanges }: TrainType): string => {
  if (typeChanges && typeChanges.length > 0) {
    const { sta } = typeChanges[0];
    // eslint-disable-next-line no-irregular-whitespace
    return `${capStationNameDict[sta]}　${capStationNameDict[dest]}`;
  }
  return simpleStationNameDict[dest] ?? "-";
};

const getType = ({ type, direction, typeChanges }: TrainType): string => {
  if (typeChanges && typeChanges.length) {
    const { type: newType } = typeChanges[0];
    const colorL = typeColorList[+type];
    const colorR = typeColorList[+newType];
    const perL = "60%";
    const perR = "62%";
    const tilt = direction === "West" ? "82deg" : "98deg";
    return `linear-gradient(${tilt}, ${colorL} ${perL}, ${colorR} ${perR})`;
  }
  return typeColorList[+type];
};

const typeColorList: { [key: number]: string } = {
  1: "#cf167c",
  2: "#05b08d",
  3: "#0f4e8c",
  4: "#f79328",
  5: "#d3c427",
  6: "#808285",
  7: "#808285",
  8: "#808285",
  9: "linear-gradient(90deg, #d5007f 10%, #000 10%, #000 90%, #d5007f 90%)",
  10: "#808285",
  11: "linear-gradient(90deg, #57a100 10%, #000 10%, #000 90%, #57a100 90%)",
};

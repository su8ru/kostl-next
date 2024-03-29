import { Flex, Text } from "@chakra-ui/react";
import { capStationNameDict, simpleStationNameDict } from "$/service/data";
import { Train as TrainType } from "$/types/train";
import { trainItemsSettingAtom, triggerDetailsAtom } from "~/atoms";
import { TrainItem } from "~/types/settings";
import { useKeioPink } from "~/utils/colors";
import { useAtom } from "jotai";

export interface Props {
  train: TrainType;
}

const Train: React.VFC<Props> = ({ train }) => {
  const { id, operationId, delay, direction, carCount, unitId } = train;
  const [trainItemsSetting] = useAtom(trainItemsSettingAtom);
  const [triggerDetails] = useAtom(triggerDetailsAtom);
  const keioPink = useKeioPink();

  const itemIdToValue = (itemId: TrainItem): string => {
    switch (itemId) {
      case "trainId":
        return id;
      case "operationId":
        return operationId ?? "-";
      case "destination":
        return getDest(train);
      case "unitId":
        return unitId ?? "-";
      case "carCount":
        return carCount?.toString() ?? "-";
    }
  };

  return (
    <Flex
      alignItems="center"
      direction={direction === "East" ? "column" : "column-reverse"}
    >
      <Flex
        alignItems="center"
        w="54px"
        color="#fff"
        fontWeight="500"
        py="1"
        border="2px"
        borderColor="#fff"
        boxShadow="base"
        direction={direction === "East" ? "column" : "column-reverse"}
        bg={getType(train)}
        borderTopRadius={direction === "East" ? "md" : "sm"}
        borderBottomRadius={direction === "East" ? "sm" : "md"}
        cursor="pointer"
        onClick={() => {
          if (triggerDetails) triggerDetails(train);
        }}
      >
        {trainItemsSetting.map((itemId) => (
          <Text fontSize="sm" key={itemId}>
            {itemIdToValue(itemId)}
          </Text>
        ))}
      </Flex>
      {delay > 0 && (
        <Text color={keioPink} fontWeight="900" fontSize="sm">
          + {delay}
        </Text>
      )}
    </Flex>
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

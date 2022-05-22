import { Flex, Text } from "@chakra-ui/react";
import { Train, TrainDirection, TypeChange } from "$/types/train";
import { destListKeio, stationNameCapitalList } from "$/service/data";
import { useRecoilValue } from "recoil";
import trainItemsSettingState from "~/states/atoms/trainItemsSettingState";
import { TrainItem } from "~/types/settings";

export interface Props {
  train: Train;
}

const Train: React.VFC<Props> = ({
  train: { id, type, dest, operationId, delay, direction, typeChanges, length },
}) => {
  const trainItemsSetting = useRecoilValue(trainItemsSettingState);

  const itemIdToValue = (itemId: TrainItem): string => {
    switch (itemId) {
      case "trainId":
        return id;
      case "operationId":
        return operationId ?? "-";
      case "destination":
        return getDest(dest, typeChanges);
      case "carId":
        return "-";
      case "carCount":
        return length?.toString() ?? "-";
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
        bg={getType(type, direction, typeChanges)}
        borderTopRadius={direction === "East" ? "md" : "sm"}
        borderBottomRadius={direction === "East" ? "sm" : "md"}
      >
        {trainItemsSetting.map((itemId) => (
          <Text fontSize="sm" key={itemId}>
            {itemIdToValue(itemId)}
          </Text>
        ))}
      </Flex>
      {delay > 0 && (
        <Text color="#cf167c" fontWeight="900" fontSize="sm">
          + {delay}
        </Text>
      )}
    </Flex>
  );
};

export default Train;

const getDest = (dest: string, typeChanges?: TypeChange[]): string => {
  if (typeChanges && typeChanges.length) {
    const { dest: newDest } = typeChanges[0];
    // eslint-disable-next-line no-irregular-whitespace
    return `${stationNameCapitalList[dest]}　${stationNameCapitalList[newDest]}`;
  }
  return destListKeio[dest] ?? "-";
};

const getType = (
  type: string,
  direction: TrainDirection,
  typeChanges?: TypeChange[]
): string => {
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
  2: "#05B08D",
  3: "#0F4E8C",
  4: "#F79328",
  5: "#D3C427",
  6: "#808285",
  7: "#808285",
  8: "#808285",
  9: "linear-gradient(90deg, #d5007f 0%, #d5007f 10%, #000 10%, #000 90%, #d5007f 90%, #d5007f 100%)",
  10: "#808285",
  11: "#57A100",
};

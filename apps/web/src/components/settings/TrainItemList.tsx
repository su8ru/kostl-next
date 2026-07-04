import { Box, Divider } from "@chakra-ui/react";
import { trainItemsSettingAtom } from "~/atoms";
import TrainItemCheckbox from "~/components/settings/TrainItemCheckbox";
import { TrainItem, trainItemArray } from "~/types/settings";
import { useAtom } from "jotai";

const TrainItemList: React.VFC = () => {
  const [trainItemsSetting, setTrainItemsSetting] = useAtom(
    trainItemsSettingAtom
  );

  const onClick = (itemId: TrainItem) => {
    if (trainItemsSetting.includes(itemId)) {
      setTrainItemsSetting((curr) => curr.filter((i) => i !== itemId));
    } else {
      setTrainItemsSetting((curr) => [...curr, itemId]);
    }
  };

  const moveUp = (index: number) => {
    setTrainItemsSetting((curr) => {
      const arr = [...curr];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  const moveDown = (index: number) => {
    setTrainItemsSetting((curr) => {
      const arr = [...curr];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      return arr;
    });
  };

  return (
    <Box w="48">
      {trainItemsSetting.map((itemId, index, array) => (
        <TrainItemCheckbox
          itemId={itemId}
          key={itemId}
          isChecked={true}
          onClick={() => onClick(itemId)}
          moveUp={index > 0 ? () => moveUp(index) : undefined}
          moveDown={
            index + 1 < array.length ? () => moveDown(index) : undefined
          }
        />
      ))}
      <Divider mb="1" />
      {trainItemArray
        .filter((itemId) => !trainItemsSetting.includes(itemId))
        .map((itemId) => (
          <TrainItemCheckbox
            itemId={itemId}
            key={itemId}
            isChecked={false}
            onClick={() => onClick(itemId)}
          />
        ))}
    </Box>
  );
};

export default TrainItemList;

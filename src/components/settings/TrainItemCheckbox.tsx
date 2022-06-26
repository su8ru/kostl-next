import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Checkbox, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { TrainItem } from "~/types/settings";

export type Props = {
  itemId: TrainItem;
  isChecked: boolean;
  onClick: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
};

const TrainItemCheckbox: React.VFC<Props> = ({
  itemId,
  isChecked,
  onClick,
  moveUp,
  moveDown,
}) => {
  return (
    <Flex p="1">
      <Checkbox isChecked={isChecked} onChange={onClick}>
        {itemName[itemId]}
      </Checkbox>
      <Spacer />
      {isChecked && (
        <>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="up"
            icon={<BsFillCaretUpFill />}
            onClick={moveUp}
            isDisabled={!moveUp}
          />
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="down"
            icon={<BsFillCaretDownFill />}
            onClick={moveDown}
            isDisabled={!moveDown}
          />
        </>
      )}
    </Flex>
  );
};

export default TrainItemCheckbox;

const itemName: Record<TrainItem, string> = {
  trainId: "列車番号",
  operationId: "運用番号",
  destination: "行き先",
  unitId: "編成番号",
  carCount: "編成両数",
};

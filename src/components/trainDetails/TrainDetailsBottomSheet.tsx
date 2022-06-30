import { useEffect, useRef, useState } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Text } from "@chakra-ui/react";
import { Train } from "$/types/train";
import { triggerDetailsAtom } from "~/atoms";
import TrainDetailsBody from "~/components/trainDetails/TrainDetailsBody";
import TrainDetailsHeader from "~/components/trainDetails/TrainDetailsHeader";
import { useBgColor } from "~/utils/colors";
import { useAtom } from "jotai";

const TrainDetailsBottomSheet: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [train, setTrain] = useState<Train | null>(null);
  const [, setTriggerDetails] = useAtom(triggerDetailsAtom);
  const sheetRef = useRef<BottomSheetRef>(null);
  const bgColor = useBgColor();

  useEffect(() => {
    const triggerFn = (_train: Train) => {
      setOpen(true);
      setTrain(_train);
    };
    setTriggerDetails(() => triggerFn);
  }, [setTrain, setTriggerDetails]);

  const onDismiss = () => {
    setOpen(false);
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      ref={sheetRef}
      snapPoints={({ maxHeight, headerHeight }) => [
        headerHeight + 8,
        maxHeight / 2,
        maxHeight,
      ]}
      header={
        train && <TrainDetailsHeader train={train} onDismiss={onDismiss} />
      }
      style={{ ["--rsbs-bg" as any]: bgColor }}
    >
      {train ? (
        <TrainDetailsBody train={train} />
      ) : (
        <>
          <Text>No Train Selected</Text>
        </>
      )}
    </BottomSheet>
  );
};

export default TrainDetailsBottomSheet;

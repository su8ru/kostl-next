import { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { trainItemsSettingAtom } from "~/atoms";
import KeioLine from "~/components/KeioLine";
import ToeiLine from "~/components/ToeiLine";
import TrainDetailsBottomSheet from "~/components/trainDetails/TrainDetailsBottomSheet";
import useRestoreScroll from "~/hooks/useRestoreScroll";
import { useAtom } from "jotai";

const Page: NextPage = () => {
  const [trainItemsSetting] = useAtom(trainItemsSettingAtom);
  useRestoreScroll(0, 1000, trainItemsSetting.length);

  return (
    <Box>
      <Head>
        <title>こすとれ - KO･S Train Location</title>
      </Head>
      <Box p="4">
        <ToeiLine />
        <KeioLine />
        <TrainDetailsBottomSheet />
      </Box>
    </Box>
  );
};

export default Page;

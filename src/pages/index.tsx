import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { trainItemsSettingAtom } from "~/atoms";
import KeioLine from "~/components/KeioLine";
import ToeiLine from "~/components/ToeiLine";
import Head from "next/head";
import useRestoreScroll from "~/hooks/useRestoreScroll";

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
      </Box>
    </Box>
  );
};

export default Page;

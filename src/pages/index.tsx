import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import KeioLine from "~/components/KeioLine";
import ToeiLine from "~/components/ToeiLine";
import Head from "next/head";

const Page: NextPage = () => {
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

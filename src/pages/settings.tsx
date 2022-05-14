import { NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import Head from "next/head";

const Settings: NextPage = () => {
  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8">
      <Head>
        <title>設定 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>設定</H2>
        <Text mt="4">準備中…</Text>
      </Box>
    </Box>
  );
};

export default Settings;

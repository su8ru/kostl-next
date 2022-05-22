import { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import H3 from "src/components/docs/H3";
import Head from "next/head";
import TrainItemList from "~/components/settings/TrainItemList";
import ExampleTrain from "~/components/ExampleTrain";

const Settings: NextPage = () => {
  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8" textAlign="left">
      <Head>
        <title>設定 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>設定</H2>
        <H3>表示項目</H3>
        <Text mt="4">
          列車アイコンに表示する項目を設定できます。チェックボックスで表示の有無を、右の上下ボタンで表示順序を設定できます。
        </Text>
        <Text mt="4">「行き先」は一番下にするのがおすすめです。</Text>
        <Flex
          mt="4"
          alignItems="center"
          justifyContent="space-between"
          wrap="wrap"
        >
          <TrainItemList />
          <ExampleTrain />
        </Flex>
      </Box>
    </Box>
  );
};

export default Settings;

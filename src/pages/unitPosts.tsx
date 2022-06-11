import { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import H3 from "~/components/docs/H3";
import UnitPostForm from "~/components/unitPosts/UnitPostForm";
import UnitPostsList from "~/components/unitPosts/UnitPostsList";
import UnitPostsTable from "~/components/unitPosts/UnitPostsTable";
import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";

const Page: NextPage = () => {
  const { data: unitPosts, mutate } = useAspidaSWR(apiClient.units);

  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8" textAlign="left">
      <Head>
        <title>運用充当情報 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>運用充当情報</H2>
        <Box as="section" mt="8">
          <H3>情報投稿</H3>
          <Text mt="4">
            各運用に充当されている編成の情報を入力することで、こすとれ上に編成番号を表示することができます。この情報はサーバーに保存され、全てのユーザーに共有されます。
          </Text>
          <Box mt="4">
            <UnitPostForm mutate={mutate} />
          </Box>
        </Box>
        <Box as="section" mt="8">
          <Tabs isFitted>
            <TabList>
              <Tab>運用一覧</Tab>
              <Tab>投稿一覧</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0" pt="4">
                <UnitPostsList unitPosts={unitPosts ?? []} />
              </TabPanel>
              <TabPanel p="0" pt="4">
                <UnitPostsTable unitPosts={unitPosts ?? []} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;

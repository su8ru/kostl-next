import { NextPage } from "next";
import {
  Box,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Spinner,
} from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import Head from "next/head";
import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";
import OperationList from "~/components/operations/OperationList";
import PageWrapper from "~/components/PageWrapper";

const Operations: NextPage = () => {
  const { data } = useAspidaSWR(apiClient.operations);

  return (
    <PageWrapper>
      <Head>
        <title>運用一覧 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>運用一覧</H2>
        <Tabs isFitted mt="4">
          <TabList>
            <Tab>平日</Tab>
            <Tab>休日</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {data ? <OperationList operations={data.weekday} /> : <Spinner />}
            </TabPanel>
            <TabPanel>
              {data ? <OperationList operations={data.holiday} /> : <Spinner />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageWrapper>
  );
};

export default Operations;

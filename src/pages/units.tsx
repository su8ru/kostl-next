import { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import H2 from "~/components/docs/H2";

const Page: NextPage = () => {
  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8" textAlign="left">
      <Head>
        <title>運用投稿 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>運用投稿</H2>
      </Box>
    </Box>
  );
};

export default Page;

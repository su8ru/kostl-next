import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Code,
  Divider,
  Flex,
  Link,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import CopyButton from "~/components/CopyButton";
import ExampleTrain from "~/components/ExampleTrain";
import PageWrapper from "~/components/PageWrapper";
import H2 from "~/components/docs/H2";
import H3 from "~/components/docs/H3";
import ColorModeSelector from "~/components/settings/ColorModeSelector";
import TrainItemList from "~/components/settings/TrainItemList";
import User from "~/components/settings/User";
import { pagesPath } from "~/utils/$path";
import { apiClient } from "~/utils/apiClient";
import { NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA } from "~/utils/envValues";
import useAspidaSWR from "@aspida/swr";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export type StaticProps = {
  buildDateTime: string;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const buildDateTime = dayjs().tz("Asia/Tokyo").format("YYMMDD-HHmmss");
  return { props: { buildDateTime } };
};

const Settings: NextPage<StaticProps> = ({ buildDateTime }) => {
  const { data } = useAspidaSWR(apiClient.calendar);
  const version = `${
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
      ? NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.slice(0, 7)
      : "local"
  }-${buildDateTime}`;

  return (
    <PageWrapper>
      <Head>
        <title>設定 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>設定</H2>
        <Box as="section" mt="8">
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
        <Box as="section" mt="8">
          <H3>外観テーマ</H3>
          <Box mt="4">
            <ColorModeSelector />
          </Box>
        </Box>
        <Box as="section" mt="8">
          <H3>アカウント</H3>
          <Text mt="4">
            Google
            アカウントでログインすることで、編成運用情報を投稿できるようになります。
          </Text>
          <User />
          <Text color="gray" fontSize="sm" mt="4">
            アプリ内ブラウザからはログインできないことがあります。Chrome または
            Safari の使用を推奨しています。
          </Text>
        </Box>
      </Box>
      <Divider my="12" />
      <Box as="section" mt="12">
        <H2>デバッグ情報</H2>
        <H3>バージョン</H3>
        <UnorderedList spacing="2" mt="3">
          <ListItem>
            <Flex>
              <Text>{version}</Text>
              <Spacer />
              <CopyButton value={version} />
            </Flex>
          </ListItem>
        </UnorderedList>
        <H3>日付・曜日</H3>
        <UnorderedList spacing="2" mt="3">
          <ListItem>
            date: <Code>{data?.date ?? "-"}</Code>
          </ListItem>
          <ListItem>
            day: <Code>{data?.day ?? "-"}</Code>
          </ListItem>
        </UnorderedList>
        <H3>運用一覧</H3>
        <UnorderedList spacing="2" mt="3">
          <ListItem>
            <NextLink href={pagesPath.operations.$url()} passHref>
              <Link>運用一覧ページ</Link>
            </NextLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </PageWrapper>
  );
};

export default Settings;

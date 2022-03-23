import { NextPage } from "next";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import H3 from "~/components/docs/H3";

const Policy: NextPage = () => {
  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8">
      <Box as="section" mt="12">
        <H2>README</H2>
        <H3>対応路線</H3>
        <UnorderedList spacing="3" mt="4">
          <ListItem>
            京王電鉄：京王線・京王新線・京王相模原線・京王競馬場線・京王動物園線・京王高尾線
          </ListItem>
          <ListItem>都営地下鉄：新宿線（新宿～新宿三丁目駅間以東）</ListItem>
        </UnorderedList>
        <H3>提供情報</H3>
        <UnorderedList spacing="3" mt="4">
          <ListItem>列車番号：公式に提供される列車番号を使用</ListItem>
          <ListItem>種別：公式に提供される種別を使用</ListItem>
          <ListItem>行き先：公式に提供される行き先を使用</ListItem>
          <ListItem>
            運用番号：
            <UnorderedList spacing="3" mt="3">
              <ListItem>T・K 運用：公式に使用されている運用番号</ListItem>
              <ListItem>
                京王線運用：非公式の運用番号
                <Text lineHeight="1.75">
                  ＊公式に使用されている運用番号を用いることは禁止します。
                </Text>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
        <H3>途中駅における種別変更</H3>
        <Text mt="4">未対応（対応予定あり）</Text>
      </Box>
      <Box as="section" mt="12">
        <H2>利用規約</H2>
        <Text mt="4" lineHeight="1.75" align="right">
          2022 年 3 月 24 日 制定
        </Text>
        <H3>概要</H3>
        <Text mt="4" lineHeight="1.75">
          こすとれ - KO･S Train
          Location（以下、当サイトとする）は、京王電鉄の提供する「列車走行位置お知らせサービス」および公共交通オープンデータ協議会の提供する「公共交通オープンデータセンター」から、京王線・京王新線・京王相模原線・京王競馬場線・京王動物園線・京王高尾線・都営地下鉄新宿線の列車走行位置データを取得し、情報を加えた上で表示するものです。
        </Text>
        <H3>免責・注意事項</H3>
        <Text mt="4" lineHeight="1.75">
          公共交通事業者により提供されたデータを元にしていますが、必ずしも正確・完全なものとは限りません。
          よって当サイトの利用によって利用者に何らかの損害が生じた場合でも、当サイトは一切の責任を負いません。
        </Text>
        <Text mt="4" lineHeight="1.75">
          当サイトでは京王電鉄および公共交通オープンデータ協議会の提供するデータを使用していますが、当サイトについての公共交通事業者への問い合わせを固く禁じます。
        </Text>
      </Box>
      <Box as="section" mt="12">
        <H2>プライバシーポリシー</H2>
        <H3>JavaScript の実行について</H3>
        <Text mt="4" lineHeight="1.75">
          当サイトでは、情報提供のため、JavaScript を使用しています。
        </Text>
        <Text mt="4" lineHeight="1.75">
          閲覧にあたり、閲覧者のデバイスを利用して情報提供を目的とした処理を行います。JavaScript
          の実行はブラウザの機能により停止することが可能ですが、その場合当サイトは情報提供を行えません。
        </Text>
      </Box>
    </Box>
  );
};

export default Policy;

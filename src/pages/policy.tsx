import { NextPage } from "next";
import {
  Box,
  Divider,
  Icon,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import H2 from "~/components/docs/H2";
import H3 from "~/components/docs/H3";
import Head from "next/head";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Policy: NextPage = () => {
  return (
    <Box maxW="3xl" w="100%" mx="auto" px="8" pb="8">
      <Head>
        <title>利用規約 - こすとれ</title>
      </Head>
      <Box as="section" mt="12">
        <H2>about</H2>
        <H3>対応路線</H3>
        <UnorderedList spacing="2" mt="4">
          <ListItem>
            京王電鉄：京王線・京王新線・京王相模原線・京王競馬場線・京王動物園線・京王高尾線
            <Text lineHeight="1.5" color="gray">
              ＊井の頭線への対応も予定しています。
            </Text>
          </ListItem>
          <ListItem>
            都営地下鉄：新宿線全線
            <Text lineHeight="1.5" color="gray">
              ＊新宿駅の在線情報は京王電鉄からの情報を使用します。
            </Text>
          </ListItem>
        </UnorderedList>
        <H3>提供情報</H3>
        <UnorderedList spacing="2" mt="4">
          <ListItem>列車番号：公式の列車番号を使用</ListItem>
          <ListItem>
            列車種別：公式の列車種別を使用
            <Text lineHeight="1.5" color="gray">
              ＊種別変更については後述
            </Text>
          </ListItem>
          <ListItem>行き先：公式の行き先を使用</ListItem>
          <ListItem>
            運用番号：
            <UnorderedList spacing="2" mt="2">
              <ListItem>
                T・K 運用：公式の運用番号
                <Text lineHeight="1.5" color="gray">
                  ＊代走は都営線内のみ対応
                </Text>
              </ListItem>
              <ListItem>京王線運用：非公式の運用番号</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
        <H3>途中駅における種別変更</H3>
        <Text mt="4">公式に提供されている種別変更にのみ対応しています。</Text>
        <Text mt="4">対応していない例:</Text>
        <UnorderedList spacing="2" mt="3">
          <ListItem>
            都営新宿線から京王線への直通列車の、新線新宿駅での種別変更の表示
          </ListItem>
          <ListItem>京王線内での種別変更の、都営新宿線内での表示</ListItem>
          <ListItem>種別変更後の表示</ListItem>
        </UnorderedList>
        <H3>連絡先</H3>
        <UnorderedList spacing="2" mt="4">
          <ListItem>
            Twitter:{" "}
            <Link href="https://twitter.com/su8ru_" isExternal color="blue.500">
              @su8ru_ <Icon as={BsBoxArrowUpRight} />
            </Link>
          </ListItem>
          <ListItem>
            Email:{" "}
            <Link href="mailto:contact@su8ru.dev" isExternal color="blue.500">
              contact@su8ru.dev <Icon as={BsBoxArrowUpRight} />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box as="section" mt="12">
        <H2>利用規約</H2>
        <Text mt="4" lineHeight="1.75" align="right">
          2022 年 6 月 1 日 制定
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
        <H3>Firebase Authentication の使用について</H3>
        <Text mt="4" lineHeight="1.75">
          当サイトでは、ユーザーの認証管理のため、Google
          による認証管理ツール「Firebase
          Authentication」を使用しています。またこの認証情報をサーバーと共有するため
          Cookie
          を使用しています。当サイトでは、ユーザーのメールアドレスおよび表示名などの個人情報（当サイトと連携するサービスの登録情報を含みます）を収集することがあります。
        </Text>
        <Text mt="4" lineHeight="1.75">
          当サイトにおいて個人情報を収集・利用する目的は、以下のとおりです。
          <OrderedList spacing="2" mt="2">
            <ListItem>ユーザーに自身の登録情報を表示する目的</ListItem>
            <ListItem>ユーザーに連絡をする目的</ListItem>
            <ListItem>不正行為を行うユーザーを管理する目的</ListItem>
            <ListItem>その他上記の利用目的に付随する目的</ListItem>
          </OrderedList>
        </Text>
        <Text mt="4" lineHeight="1.75"></Text>
        <H3>Google Analytics の使用について</H3>
        <Text mt="4" lineHeight="1.75">
          当サイトでは、アクセス解析のため、Google
          によるアクセス解析ツール「Google Analytics」を使用しています。この
          Google Analytics はデータの収集のために Cookie
          を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        </Text>
        <Text mt="4" lineHeight="1.75">
          Google Analytics によって情報が収集され使用される詳細は、Google
          による説明ページでご確認ください。
        </Text>
        <UnorderedList spacing="3" mt="4">
          <ListItem>
            <Link
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener"
            >
              Google Analytics 利用規約
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
              rel="noopener"
            >
              Google のサービスを使用するサイトやアプリから収集した情報の Google
              による使用
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noopener"
            >
              Google プライバシー ポリシー
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Divider my="12" />
      <Box as="section" mt="12">
        <Text mt="4">&copy; subaru 2022</Text>
        <Text mt="2">
          <Link
            href="https://github.com/su8ru/kostl-next"
            isExternal
            color="blue.500"
          >
            su8ru/kostl-next
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Policy;

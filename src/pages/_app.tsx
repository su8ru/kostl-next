import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "~/aseets/global.scss";
import use100vh from "~/hooks/use100vh";
import usePageView from "~/hooks/usePageView";
import MainLayout from "~/layouts/main";
import theme from "~/utils/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();
  use100vh();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,viewport-fit=cover"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

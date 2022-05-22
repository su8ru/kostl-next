import type { AppProps } from "next/app";
import Head from "next/head";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useEffect } from "react";
import "~/aseets/global.scss";
import theme from "~/utils/theme";
import usePageView from "~/hooks/usePageView";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Flex
            minW="100%"
            minH="var(--100vh)"
            direction="column"
            alignItems="center"
          >
            <Header />
            <Box as="main" flexGrow="1" pt="10" pb="20" overflowX="auto">
              <Component {...pageProps} />
            </Box>
            <Footer />
          </Flex>
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

const handleResize = () => {
  const height = window.innerHeight;
  document.documentElement.style.setProperty("--100vh", `${height}px`);
};

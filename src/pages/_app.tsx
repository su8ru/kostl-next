import type { AppProps } from "next/app";
import Head from "next/head";
import { staticPath } from "~/utils/$path";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useEffect } from "react";
import "~/aseets/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
        <link rel="icon" href={staticPath.favicon_png} />
      </Head>
      <ChakraProvider>
        <Flex
          minW="100%"
          minH="var(--100vh)"
          direction="column"
          alignItems="center"
        >
          <Header />
          <Box as="main" flexGrow="1" pt="10" pb="10">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

const handleResize = () => {
  const height = window.innerHeight;
  document.documentElement.style.setProperty("--100vh", `${height}px`);
};

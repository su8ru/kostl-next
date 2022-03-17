import type { AppProps } from "next/app";
import Head from "next/head";
import { staticPath } from "~/utils/$path";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href={staticPath.favicon_png} />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default MyApp;

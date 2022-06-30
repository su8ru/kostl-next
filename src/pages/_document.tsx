import { Head, Html, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { staticPath } from "~/utils/$path";
import { NEXT_PUBLIC_GA_ID as GA_ID } from "~/utils/envValues";
import { config as themeConfig } from "~/utils/theme";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href={staticPath.favicon_ico} />
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${GA_ID}', {
                     page_path: window.location.pathname,
                   });`,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

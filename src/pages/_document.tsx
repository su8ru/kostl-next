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
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href={staticPath.apple_touch_icon_png}
        />
        <link
          rel="icon"
          type="image/png"
          href={staticPath.icons.icon_192x192_png}
        />
        <meta name="apple-mobile-web-app-title" content="こすとれ - kostl" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#fff" />
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762344007433225"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

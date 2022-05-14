import { Html, Head, Main, NextScript } from "next/document";
import { staticPath } from "~/utils/$path";
import { NEXT_PUBLIC_GA_ID as GA_ID } from "~/utils/envValues";

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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import type { OptionalQuery as OptionalQuery0 } from "../pages/article";

export const pagesPath = {
  article: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({
        pathname: "/article/[id]" as const,
        query: { id },
        hash: url?.hash,
      }),
    }),
    $url: (url?: { query?: OptionalQuery0; hash?: string }) => ({
      pathname: "/article" as const,
      query: url?.query,
      hash: url?.hash,
    }),
  },
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_png: "/favicon.png",
  vercel_svg: "/vercel.svg",
} as const;

export type StaticPath = typeof staticPath;

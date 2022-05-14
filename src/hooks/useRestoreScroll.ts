/**
 * 参考:
 *   【Next.js】ブラウザバック時にスクロール位置を強制的に元に戻す
 *   https://zenn.dev/catnose99/scraps/f9b00c9acf81b4
 */

import { Router, useRouter } from "next/router";
import memoryCache, { CacheClass } from "memory-cache";
import { useEffect } from "react";

const scrollXCache: CacheClass<string, number> = new memoryCache.Cache();
const scrollYCache: CacheClass<string, number> = new memoryCache.Cache();

const saveScrollPos = (pathname: string) => {
  scrollXCache.put(pathname, window.scrollX);
  scrollYCache.put(pathname, window.scrollY);
};

const restoreScrollPos = (
  pathname: string,
  initialScrollX?: number,
  initialScrollY?: number
) => {
  const scrollX = scrollXCache.get(pathname);
  const scrollY = scrollYCache.get(pathname);
  window.scrollTo(
    scrollX ?? initialScrollX ?? 0,
    scrollY ?? initialScrollY ?? 0
  );
};

const useRestoreScroll = (
  initialScrollX?: number,
  initialScrollY?: number
): void => {
  const router = useRouter();

  useEffect(() => {
    restoreScrollPos(router.pathname, initialScrollX, initialScrollY);

    const onRouteChangeStart = () => saveScrollPos(router.pathname);

    Router.events.on("routeChangeStart", onRouteChangeStart);
    return () => Router.events.off("routeChangeStart", onRouteChangeStart);
  }, []);
};

export default useRestoreScroll;

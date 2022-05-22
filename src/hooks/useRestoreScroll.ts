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

const saveScrollPos = (pathname: string, dep?: number) => {
  scrollXCache.put(pathname, window.scrollX);
  scrollYCache.put(pathname, window.scrollY / (dep ?? 1));
};

const restoreScrollPos = (
  pathname: string,
  initialScrollX?: number,
  initialScrollY?: number,
  dep?: number
) => {
  const scrollX = scrollXCache.get(pathname);
  const scrollY = scrollYCache.get(pathname);
  window.scrollTo(
    scrollX ?? initialScrollX ?? 0,
    (scrollY ?? initialScrollY ?? 0) * (dep ?? 1)
  );
};

const useRestoreScroll = (
  initialScrollX?: number,
  initialScrollY?: number,
  dep?: number
): void => {
  const router = useRouter();

  useEffect(() => {
    restoreScrollPos(router.pathname, initialScrollX, initialScrollY, dep);

    const onRouteChangeStart = () => saveScrollPos(router.pathname, dep);

    Router.events.on("routeChangeStart", onRouteChangeStart);
    return () => Router.events.off("routeChangeStart", onRouteChangeStart);
  }, []);
};

export default useRestoreScroll;

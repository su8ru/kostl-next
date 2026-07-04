import { useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_PUBLIC_GA_ID as GA_ID } from "~/utils/envValues";
import { pageview } from "~/utils/gtag";

const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    if (!GA_ID) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRouteChange = (path: string, { shallow }: any) => {
      if (!shallow) {
        pageview(path);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default usePageView;

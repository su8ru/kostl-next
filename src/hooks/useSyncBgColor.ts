import { useEffect } from "react";
import { useBgColor } from "~/utils/colors";

const useSyncColorMode = (): void => {
  const bgColor = useBgColor();
  useEffect(() => {
    document
      .querySelector("meta[name=theme-color]")
      ?.setAttribute("content", bgColor);
  }, [bgColor]);
};

export default useSyncColorMode;

import { useEffect } from "react";

const use100vh = (): void => {
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
};

const handleResize = () => {
  const height = window.innerHeight;
  document.documentElement.style.setProperty("--100vh", `${height}px`);
};

export default use100vh;

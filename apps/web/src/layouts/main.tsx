import { PropsWithChildren } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import useSyncBgColor from "~/hooks/useSyncBgColor";

const MainLayout: React.VFC<PropsWithChildren<unknown>> = ({ children }) => {
  useSyncBgColor();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "var(--100vh)",
        minWidth: "100%",
      }}
    >
      <Header />
      <main
        style={{
          flexGrow: 1,
          overflowX: "auto",
          paddingBottom: "5rem",
          paddingTop: "2.5rem",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

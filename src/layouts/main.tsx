import { PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import useSyncBgColor from "~/hooks/useSyncBgColor";

const MainLayout: React.VFC<PropsWithChildren<unknown>> = ({ children }) => {
  useSyncBgColor();

  return (
    <Flex
      minW="100%"
      minH="var(--100vh)"
      direction="column"
      alignItems="center"
    >
      <Header />
      <Box as="main" flexGrow="1" pt="10" pb="20" overflowX="auto">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;

import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  textAlign?: "left" | "center" | "right";
};

const PageWrapper: React.VFC<PropsWithChildren<Props>> = ({
  children,
  textAlign,
}) => (
  <Box
    maxW="3xl"
    w="100vw"
    mx="auto"
    px="8"
    pb="8"
    textAlign={textAlign ?? "left"}
  >
    {children}
  </Box>
);

export default PageWrapper;

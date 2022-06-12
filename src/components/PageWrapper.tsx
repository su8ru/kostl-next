import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";
import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import * as CSS from "csstype";

type Props = {
  textAlign?: Token<CSS.Property.TextAlign>;
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

import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";

const Footer: React.VFC = () => {
  return (
    <>
      <Divider />
      <Box as="footer" w="100%" pos="sticky" top="100vh" bg="#fff" p="2">
        <Text align="center">&copy; subaru 2022</Text>
      </Box>
    </>
  );
};

export default Footer;

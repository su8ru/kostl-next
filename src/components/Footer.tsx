import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";

const Footer: React.VFC = () => {
  return (
    <>
      <Box
        as="footer"
        w="100%"
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="#fff"
        h="10"
      >
        <Divider />
        <Box p="2">
          <Text align="center">&copy; subaru 2022</Text>
        </Box>
      </Box>
    </>
  );
};

export default Footer;

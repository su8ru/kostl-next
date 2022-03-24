import NextLink from "next/link";
import { Box, Divider, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { pagesPath } from "~/utils/$path";

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
        h="20"
      >
        <Divider />
        <VStack spacing="2" p="3">
          <HStack>
            <NextLink href={pagesPath.$url()} passHref>
              <Link color="blue.500">在線</Link>
            </NextLink>
            <span>･</span>
            <NextLink href={pagesPath.policy.$url()} passHref>
              <Link color="blue.500">利用規約</Link>
            </NextLink>
          </HStack>
          <Box>
            <Text align="center">&copy; subaru 2022</Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Footer;

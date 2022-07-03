import { Flex, Heading, Text } from "@chakra-ui/react";

const Header: React.VFC = () => {
  return (
    <Flex
      as="header"
      h="10"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      justifyContent="center"
      bg="linear-gradient(0deg,#0d3870 46%,#fff 0,#fff 54%,#cf167c 0)"
      boxShadow="lg"
      zIndex="sticky"
    >
      <Flex
        alignItems="baseline"
        pt="1"
        px="3"
        bg="#cf167c"
        color="#fff"
        borderX="3px solid #fff"
      >
        <Heading as="h1" fontSize="lg" mt="1" mr="1">
          こすとれ
        </Heading>
        <Text fontSize="xs" mr="3">
          BETA
        </Text>
        <Text fontSize="xs">KO･S Train Location</Text>
      </Flex>
    </Flex>
  );
};

export default Header;

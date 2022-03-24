import { Text, Flex, Heading } from "@chakra-ui/react";

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
      bg="linear-gradient(0deg,#00205b 46%,#fff 0,#fff 54%,#ab035c 0)"
      boxShadow="lg"
    >
      <Flex
        alignItems="baseline"
        pt="1"
        px="3"
        bg="#ab035c"
        color="#fff"
        borderX="3px solid #fff"
      >
        <Heading as="h1" fontSize="lg" mt="1" mr="1">
          こすとれ
        </Heading>
        <Text fontSize="xs" mr="3">
          BETA
        </Text>
        <Text fontSize="md">KO･S Train Location</Text>
      </Flex>
    </Flex>
  );
};

export default Header;

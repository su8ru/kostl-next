import * as React from "react";
import { useRouter } from "next/router";
import {
  Box,
  ComponentWithAs,
  Flex,
  Icon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { UrlObject } from "url";

export type Props = {
  icon:
    | ((props: React.SVGAttributes<SVGElement>) => JSX.Element)
    | ComponentWithAs<"svg", IconProps>;
  label: string;
  href: UrlObject;
};

const BottomNavItem: React.VFC<Props> = ({ icon, href, label }) => {
  const router = useRouter();
  const color = useColorModeValue("#ab035c", "#fff");
  const bgColor = useColorModeValue("#f7e6ef", "#252730");

  return (
    <Box
      onClick={() => router.push(href)}
      color={router.pathname === href.pathname ? color : "gray"}
      w="60px"
      p="2"
      role="button"
    >
      <Flex
        direction="column"
        alignItems="center"
        borderRadius="100px"
        transition="all 0.3s ease"
        _active={{
          bgColor: bgColor,
        }}
      >
        <Icon as={icon} w="6" h="6" area-label={label} />
      </Flex>
    </Box>
  );
};

export default BottomNavItem;

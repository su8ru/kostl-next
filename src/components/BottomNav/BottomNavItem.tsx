import { useRouter } from "next/router";
import { Box, ComponentWithAs, Flex, Icon, IconProps } from "@chakra-ui/react";
import { UrlObject } from "url";
import * as React from "react";

export type Props = {
  icon:
    | ((props: React.SVGAttributes<SVGElement>) => JSX.Element)
    | ComponentWithAs<"svg", IconProps>;
  label: string;
  href: UrlObject;
};

const BottomNavItem: React.VFC<Props> = ({ icon, href, label }) => {
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push(href)}
      color={router.pathname === href.pathname ? "#ab035c" : "gray"}
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
          bgColor: "#f7e6ef",
        }}
      >
        <Icon as={icon} w="6" h="6" area-label={label} />
      </Flex>
    </Box>
  );
};

export default BottomNavItem;

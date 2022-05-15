import { ComponentWithAs, HStack, IconProps } from "@chakra-ui/react";
import BottomNavItem from "~/components/BottomNav/BottomNavItem";
import { UrlObject } from "url";
import * as React from "react";

export type Props = {
  items: ReadonlyArray<{
    label: string;
    href: UrlObject;
    icon:
      | ((props: React.SVGAttributes<SVGElement>) => JSX.Element)
      | ComponentWithAs<"svg", IconProps>;
  }>;
};

const BottomNav: React.VFC<Props> = ({ items }) => (
  <HStack px="2" spacing="2">
    {items.map((item) => (
      <BottomNavItem key={item.label} {...item} />
    ))}
  </HStack>
);

export default BottomNav;

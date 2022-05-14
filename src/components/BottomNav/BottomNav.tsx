import { HStack } from "@chakra-ui/react";
import BottomNavItem from "~/components/BottomNav/BottomNavItem";
import { IconType } from "react-icons";
import { UrlObject } from "url";

export type Props = {
  items: ReadonlyArray<{
    label: string;
    href: UrlObject;
    icon: IconType;
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

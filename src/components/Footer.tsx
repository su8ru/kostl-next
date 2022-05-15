import { Box } from "@chakra-ui/react";
import BottomNav from "~/components/BottomNav/BottomNav";
import { BsFileEarmarkText, BsGear } from "react-icons/bs";
import { pagesPath } from "~/utils/$path";
import { TrafficIcon } from "~/components/Icons";

const Footer: React.VFC = () => (
  <Box
    as="footer"
    pos="fixed"
    width="min-content"
    bottom="0"
    left="50%"
    right="0"
    transform="translateX(-50%)"
  >
    <Box
      bgColor="white"
      borderRadius="lg"
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.1)"
      mb="2"
    >
      <BottomNav
        items={[
          { label: "在線", href: pagesPath.$url(), icon: TrafficIcon },
          {
            label: "利用規約",
            href: pagesPath.policy.$url(),
            icon: BsFileEarmarkText,
          },
          {
            label: "設定",
            href: pagesPath.settings.$url(),
            icon: BsGear,
          },
        ]}
      />
    </Box>
  </Box>
);

export default Footer;

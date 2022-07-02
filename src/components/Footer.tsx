import { BsFileEarmarkText, BsGear } from "react-icons/bs";
import { Box } from "@chakra-ui/react";
import BottomNav from "~/components/BottomNav/BottomNav";
import { TrafficIcon, TrainIcon } from "~/components/Icons";
import { pagesPath } from "~/utils/$path";
import { useFloatingBgColor } from "~/utils/colors";

const Footer: React.VFC = () => {
  const bgColor = useFloatingBgColor();

  return (
    <Box
      as="footer"
      pos="fixed"
      width="min-content"
      bottom="0"
      left="50%"
      right="0"
      transform="translateX(-50%)"
      zIndex="sticky"
    >
      <Box
        bgColor={bgColor}
        borderRadius="lg"
        boxShadow="0 5px 10px rgba(0, 0, 0, 0.1)"
        mb="calc(12px + env(safe-area-inset-bottom, 0))"
      >
        <BottomNav
          items={[
            { label: "在線", href: pagesPath.$url(), icon: TrafficIcon },
            {
              label: "運用投稿",
              href: pagesPath.unitPosts.$url(),
              icon: TrainIcon,
            },
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
};

export default Footer;

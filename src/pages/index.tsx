import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import KeioLine from "~/components/KeioLine";
import ToeiLine from "~/components/ToeiLine";

const Page: NextPage = () => {
  return (
    <Box>
      <ToeiLine />
      <KeioLine />
    </Box>
  );
};

export default Page;

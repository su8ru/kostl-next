import { Flex, Image, Text } from "@chakra-ui/react";
import { typeList } from "$/service/data";
import { staticPath } from "~/utils/$path";
import { typeColorList } from "~/utils/colors";

export type Props = {
  type: number;
};

const TrainType: React.VFC<Props> = ({ type }) => {
  if (type === 9 || type === 11)
    return (
      <Flex
        w="20"
        h="8"
        mx="2"
        bgColor="#fff"
        border={`2px solid ${typeColorList[type]}`}
        borderRadius="md"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={typeLogoList[type]} alt={typeList[type]} w="72px" />
      </Flex>
    );

  return (
    <Text
      w="20"
      h="8"
      textAlign="center"
      bgColor={typeColorList[type]}
      borderRadius="md"
      color="#fff"
      mx="2"
      lineHeight="8"
      fontWeight="500"
    >
      {typeList[type]}
    </Text>
  );
};

export default TrainType;

const typeLogoList: Record<number, string> = {
  9: staticPath.img.keio_liner_svg,
  11: staticPath.img.mt_takao_svg,
};

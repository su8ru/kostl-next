import { staticPath } from "~/utils/$path";
import { Box, Image, LayoutProps } from "@chakra-ui/react";

export type Props = {
  line: "keio" | "toei";
  id: string;
  w?: LayoutProps["w"];
  h?: LayoutProps["h"];
};

const NumberingIcon: React.VFC<Props> = ({ line, id, w, h }) => {
  const basePath = staticPath.img.numberings[line];
  const fileName = `$${id}_svg`;

  const isValidFileName = (value: unknown): value is keyof typeof basePath => {
    return typeof value === "string" && value in basePath;
  };

  if (isValidFileName(fileName))
    return <Image src={basePath[fileName]} alt={`${line}-${id}`} w={w} h={h} />;

  return <Box w={w} h={h} />;
};

export default NumberingIcon;

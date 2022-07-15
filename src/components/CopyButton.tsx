import { FiCopy } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";

export type Props = {
  value: string;
};

const CopyButton: React.VFC<Props> = ({ value }) => {
  return (
    <IconButton
      colorScheme="gray"
      aria-label="copy"
      size="xs"
      icon={<FiCopy />}
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    />
  );
};

export default CopyButton;

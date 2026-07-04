import { FiCopy } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";

const CopyIconButton = IconButton as React.ComponentType<{
  "aria-label": string;
  colorScheme: string;
  icon: React.ReactElement;
  onClick: () => void;
  size: string;
}>;

export type Props = {
  value: string;
};

const CopyButton: React.VFC<Props> = ({ value }) => {
  return (
    <CopyIconButton
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

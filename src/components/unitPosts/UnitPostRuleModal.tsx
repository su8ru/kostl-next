import {
  Box,
  Divider,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UnitPostRuleModal: React.VFC<Props> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>編成運用投稿 入力ルール</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box as="pre" bgColor="gray.100" borderRadius="base" px="4" py="2">
          {`No.12 8710F
82 8702F
25T 600F
14 7805F+7705F
51K 5736F`}
        </Box>
        <UnorderedList spacing="1" my="2" fontSize="sm">
          <ListItem>
            運用番号 編成番号 の順に改行区切りで入力してください。
          </ListItem>
          <ListItem>No. は省略可能です。</ListItem>
          <ListItem>都営車は下 3 桁のみ入力してください。</ListItem>
          <ListItem>
            連結している場合は、新宿側から順に + で繋げて入力してください。
          </ListItem>
        </UnorderedList>
        <Divider />
        <Text fontSize="sm" my="2">
          入力された情報は直ちに全てのユーザーへ反映されます。情報の正確性に留意してください。悪質な入力には
          BAN を含めた厳正な対応を行います。
        </Text>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default UnitPostRuleModal;

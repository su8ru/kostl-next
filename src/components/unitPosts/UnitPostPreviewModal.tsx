import { useState } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { UnitPost, UnitPostBody } from "$/types/unit";
import useAspidaSWR from "@aspida/swr";
import { apiClient } from "~/utils/apiClient";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  clearForm: () => void;
  unitPosts: UnitPostBody[];
};

const UnitPostPreviewModal: React.VFC<Props> = ({
  isOpen,
  onClose,
  clearForm,
  unitPosts: previewPosts,
}) => {
  const toast = useToast();
  const { data: beforePosts } = useAspidaSWR(apiClient.units);
  const validPosts: UnitPost[] =
    beforePosts?.filter(({ disabledAt }) => disabledAt === null) ?? [];
  const [postStatus, setPostStatus] = useState<"loading" | "error" | null>(
    null
  );

  const post = async () => {
    setPostStatus("loading");
    apiClient.units
      .$post({ body: previewPosts })
      .then(() => {
        setPostStatus(null);
        toast({
          title: "投稿完了！",
          status: "success",
          duration: 5000,
          isClosable: true,
          containerStyle: {
            marginBottom: "calc(64px + env(safe-area-inset-bottom, 0))",
          },
        });
        clearForm();
        onClose();
      })
      .catch(() => {
        setPostStatus("error");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>投稿プレビュー</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            この投稿により以下の変更が生じます。必ず確認してください。
          </Text>
          <Table size="sm" mt="4">
            <Thead>
              <Tr>
                <Th>運用番号</Th>
                <Th>変更前</Th>
                <Th></Th>
                <Th>変更後</Th>
              </Tr>
            </Thead>
            <Tbody>
              {previewPosts.map(({ operationId, unitId }) => (
                <Tr key={operationId}>
                  <Td>{operationId}</Td>
                  <Td>
                    <Text as="del">
                      {validPosts.find(
                        ({ operationId: _operationId }) =>
                          _operationId === operationId
                      )?.unitId ?? <Text color="gray">未投稿</Text>}
                    </Text>
                  </Td>
                  <Td>→</Td>
                  <Td>{unitId}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Flex mt="2" alignItems="center" gap="2">
            <Button
              colorScheme="gray"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button
              colorScheme={postStatus === "error" ? "red" : "blue"}
              isLoading={postStatus === "loading"}
              onClick={post}
            >
              投稿
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnitPostPreviewModal;

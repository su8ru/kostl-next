import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import { UnitPostBody } from "$/types/unit";
import normalizeOperationId from "$/utils/notmalizeOperationId";
import UnitPostPreviewModal from "~/components/unitPosts/UnitPostPreviewModal";
import UnitPostRuleModal from "~/components/unitPosts/UnitPostRuleModal";

type Props = {
  mutate?: () => void;
};

const UnitPostForm: React.VFC<Props> = ({ mutate }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useBoolean(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useBoolean(false);

  useEffect(() => {
    setIsValid(validateUnitPostsField(value));
  }, [value]);

  return (
    <>
      <Box>
        <Textarea
          resize="none"
          value={value}
          isInvalid={isValid === false}
          onChange={(e) => setValue(e.target.value)}
          h="200"
        />
        {isValid === false && (
          <Text fontSize="sm" color="red" mt="2">
            形式が間違っています。入力ルールを確認してください。
          </Text>
        )}
        <Flex mt="2" alignItems="center">
          <Button
            colorScheme="gray"
            variant="ghost"
            size="sm"
            onClick={setIsRuleModalOpen.on}
          >
            入力ルールを表示
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            disabled={!isValid}
            onClick={setIsPreviewModalOpen.on}
          >
            投稿
          </Button>
        </Flex>
      </Box>
      <UnitPostRuleModal
        isOpen={isRuleModalOpen}
        onClose={setIsRuleModalOpen.off}
      />
      <UnitPostPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          if (mutate) mutate();
          setIsPreviewModalOpen.off();
        }}
        clearForm={() => {
          setValue("");
        }}
        unitPosts={valueToUnitPosts(value)}
      />
    </>
  );
};

export default UnitPostForm;

const validateUnitPostsField = (value: string): boolean | null => {
  if (!value) return null;
  const lines = value.split("\n").filter((line) => line);
  return lines.every((line) =>
    /^(No\.)?\d{1,2}[K,T]? \d{3,4}F(\+\d{3,4}F)?$/.test(line)
  );
};

const valueToUnitPosts = (value: string): UnitPostBody[] => {
  if (!validateUnitPostsField(value)) return [];
  const lines = value.split("\n").filter((line) => line);
  return lines.map<UnitPostBody>((line) => {
    const fields = line.split(" ");
    return { operationId: normalizeOperationId(fields[0]), unitId: fields[1] };
  });
};

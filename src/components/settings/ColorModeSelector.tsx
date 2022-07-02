import { useEffect, useState } from "react";
import { Flex, Radio, RadioGroup, Stack, useColorMode } from "@chakra-ui/react";

const LOCAL_STORAGE_KEY = "chakra-ui-color-mode";
type ColorModeValue = "light" | "dark" | "system";

const ColorModeSelector: React.VFC = () => {
  const { colorMode: chakraColorMode, setColorMode: setChakraColorMode } =
    useColorMode();
  const [colorMode, setColorMode] = useState<ColorModeValue>("system");

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
      setColorMode("system");
    } else {
      setColorMode(chakraColorMode);
    }
  }, []);

  const updateColorMode = (value: ColorModeValue) => {
    if (value !== colorMode) {
      setColorMode(value);
      if (value === "system") {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        location.reload();
      } else {
        setChakraColorMode(value);
      }
    }
  };

  return (
    <Flex gap="2">
      <RadioGroup
        onChange={(value) => {
          updateColorMode(value as ColorModeValue);
        }}
        value={colorMode}
      >
        <Stack>
          <Radio value="system">デバイス設定を使用</Radio>
          <Radio value="light">ライトテーマ</Radio>
          <Radio value="dark">ダークテーマ</Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default ColorModeSelector;

import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

export const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "system",
};

const _fontFamily =
  "Inter,'Noto Sans JP','Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,sans-serif";

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "black")(props),
      },
    }),
  },
  fonts: {
    heading: _fontFamily,
    body: _fontFamily,
  },
});

export default theme;

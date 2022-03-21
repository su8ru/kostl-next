import { extendTheme } from "@chakra-ui/react";

const _fontFamily =
  "Inter,'Noto Sans JP','Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,sans-serif";

const theme = extendTheme({
  fonts: {
    heading: _fontFamily,
    body: _fontFamily,
  },
});

export default theme;

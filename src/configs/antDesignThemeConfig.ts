import { theme, ThemeConfig } from "antd";

export const antDesignThemeConfig: ThemeConfig = {
  ...theme,
  hashed: false,
  token: {
    fontFamily: '"Poppins", sans-serif'
  },
  components: {
    Segmented: {}
  }
};

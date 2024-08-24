import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      prettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-debugger": 0,
      "no-unused-vars": 2,
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          spaceWidth: 2,
          printWidth: 120,
          trailingComma: "none",
          endOfLine: "auto",
          parser: "typescript"
        }
      ]
    }
  }
);

import globals from "globals";
import pluginJs from "@eslint/js";
import babelEslintParser from "@babel/eslint-parser";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: babelEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
  },
  {
    ignores: [
      "node_modules/**",
      "src/__tests__/**",
      "src/lib/createElement__v2.js",
      "src/lib/eventManager.js",
      "src/lib/renderElement.js",
    ],
  },
];

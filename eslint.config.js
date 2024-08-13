import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import airbnb from "eslint-config-airbnb";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: pluginReact,
      reactRefresh: {},
      reactHooks: {},
      "@typescript-eslint": tseslint,
      "unused-imports": {},
    },
    rules: {
      "import/extensions": ["off"],
      "import/prefer-default-export": "off",
      "no-plusplus": "off",
      "semi": ["error", "always"],
      "react/jsx-filename-extension": [
        "error",
        {
          "extensions": [".tsx", ".jsx"],
        },
      ],
      "import/order": [
        "error",
        {
          "groups": ["internal", "external"],
        },
      ],
      "unused-imports/no-unused-imports": ["error"],
      "react/jsx-indent-props": ["error", "first"],
      "react/jsx-curly-newline": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-wrap-multilines": "off",
      "no-unused-vars": "off",
      "no-proto": "off",
      "camelcase": "off",
      "class-methods-use-this": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "max-classes-per-file": "off",
      "max-len": "off",
      "no-param-reassign": "off",
      "no-shadow": "off",
      "no-undef": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": "off",
      "no-useless-escape": "off",
      "react/jsx-no-useless-fragment": "off",
      "react/no-array-index-key": "off",
      "react/no-unused-prop-types": "off",
      "react/require-default-props": "off",
      "react/function-component-definition": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "no-alert": "off",
      "arrow-body-style": "off",
      "import/no-unresolved": "off",
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnb,
  prettier,
];

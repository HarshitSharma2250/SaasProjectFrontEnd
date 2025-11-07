// eslint.config.ts
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";

export default defineConfig([
  // ✅ Next.js base configs
  ...nextVitals,
  ...nextTs,

  // ✅ TypeScript rules
  ...tseslint.configs.recommended,

  // ✅ Enable React hooks & testing environments
  {
    plugins: {
      reactHooks,
      jest,
      "testing-library": testingLibrary,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        JSX: true,
        React: true,
        jest: true,
        describe: true,
        test: true,
        expect: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "testing-library/no-debugging-utils": "off",
      "testing-library/no-node-access": "off",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },

  // ✅ Ignore build outputs
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);

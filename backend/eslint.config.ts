import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
   // ------------------- JS files --------------------
  {
    extends: [js.configs.recommended],
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  // ------------------ TS files config --------------------
  {
    files: ['**/*.{ts,mts,cts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Disable base rule in favor of TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^node:'],        // Node built-ins
            ['^@?\\w'],        // External packages
            ['^@/'],           // Aliases
            ['^\\.'],          // Relative
            ['^\\u0000'],      // Side effects
          ],
        },
      ],
      'simple-import-sort/exports':[ 'warn'],
    },
  },
]);

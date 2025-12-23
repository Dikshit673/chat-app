import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
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
    // extends: [
      // 'eslint:recommended',               // ESLint recommended rules
      // 'plugin:@typescript-eslint/recommended', // TS recommended rules
      // 'plugin:prettier/recommended'       // Prettier integration
    // ],
    rules:{
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Node.js builtins
            ['^node:'],

            // External packages
            ['^@?\\w'],

            // Absolute imports (aliases)
            ['^@/'],

            // Relative imports
            ['^\\.'],

            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    }
  },
]);

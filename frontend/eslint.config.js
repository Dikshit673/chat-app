import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  globalIgnores(['dist']),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
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
])

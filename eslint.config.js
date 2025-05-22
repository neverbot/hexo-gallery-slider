import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import eslintJsonc from 'eslint-plugin-jsonc';
import eslintJsoncParser from 'jsonc-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

export default [
  {
    // global ignores
    // folders can only be ignored at the global level, per-cfg you must do: '**/dist/**/*'
    ignores: ['**/coverage/', '**/node_modules/'],
  },
  // general defaults
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
      'import/extensions': [
        'warn',
        'always',
        {
          js: 'always',
          json: 'always',
        },
      ],
    },
    plugins: {
      prettier,
      importPlugin,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.mocha,
        hexo: 'writable',
      },
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: true,

        ecmaFeatures: {
          experimentalObjectRestSpread: true,
        },
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['**/package.json', '**/package-lock.json'],
    plugins: {
      jsonc: eslintJsonc,
      prettier,
    },
    languageOptions: {
      parser: eslintJsoncParser,
      parserOptions: {
        jsonSyntax: 'JSON',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
    },
  },
];

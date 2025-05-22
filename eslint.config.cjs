const globals = require('globals');
const babelParser = require('@babel/eslint-parser');
const eslintJsonc = require('eslint-plugin-jsonc');
const eslintJsoncParser = require('jsonc-eslint-parser');
const prettier = require('eslint-plugin-prettier');
const js = require('@eslint/js');

module.exports = [
  {
    // global ignores
    ignores: ['**/coverage/', '**/node_modules/'],
  },
  js.configs.recommended,
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
    },
    plugins: {
      prettier,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        hexo: 'writable',
      },
      parserOptions: {
        requireConfigFile: false,
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

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import daStyle from 'eslint-config-dicodingacademy';
import pluginCypress from 'eslint-plugin-cypress';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['cypress/**/*.{js,jsx}', 'cypress.config.js'],
    plugins: {
      cypress: pluginCypress,
    },
    // Extract the rules from the recommended config
    rules: {
      ...(pluginCypress.configs.recommended.rules || {}),
      // Disable no-undef for Cypress files since Cypress adds globals
      'no-undef': 'off',
      // Allow unused expressions for chai assertions
      'no-unused-expressions': 'off',
    },
    // Add cypress globals if needed
    languageOptions: {
      globals: {
        ...globals.browser,
        ...(pluginCypress.environments?.cypress?.globals || {}),
        // Explicitly add Cypress globals
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        context: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      'coverage',
      'cypress/reports',
      '**/*.min.js',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Override indent rule to correctly handle switch case indentation
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          flatTernaryExpressions: false,
          ignoredNodes: [],
        },
      ],
    },
  },
  daStyle,
  prettierConfig,
];

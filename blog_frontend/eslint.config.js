import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginVitestGlobals from 'eslint-plugin-vitest-globals'

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'vite.config.js'],
  },
  {
    files: ['**/*.test.js.{js,jsx}', '**/__tests__/**/*.{js,jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,

      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 0,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
import globals from 'globals'
import jsConfig from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'

const commonConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      React: 'readonly',
    },
  },
  plugins: {
    react: reactPlugin,
  },
  rules: {
    ...jsConfig.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off', // 自動インポートに対応
    'react/jsx-uses-react': 'off', // React のインポート不要
    'react/jsx-uses-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect', // 使用しているReactのバージョンを自動検出
    },
  },
}

const tsConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: './tsconfig.eslint.json',
      ecmaVersion: 2023,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}

const testConfig = {
  files: ['**/*.{test,spec}.{ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

/** @type {import('eslint').Linter.Config[]} */
export default [commonConfig, tsConfig, testConfig]

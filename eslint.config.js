const tseslint = require('typescript-eslint')
const react = require('eslint-plugin-react')
const prettier = require('eslint-config-prettier')
const globals = require('globals')

module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', 'out/**', '.next/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    extends: [
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      prettier,
    ],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/display-name': 0,
      'react/prop-types': 0,
      'react/no-unknown-property': [2, { ignore: ['jsx', 'global'] }],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        2,
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  }
)

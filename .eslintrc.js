module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: [2, 2],
    'react/react-in-jsx-scope': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../../../*'],
            message: 'usage of import1 private modules not allowed.',
          },
        ],
      },
    ],
  },
};

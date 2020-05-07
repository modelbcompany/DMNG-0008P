/**
 * @file ESLint Configuration
 * @see {@link https://eslint.org/docs/user-guide/configuring}
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: false,
    jest: true,
    jquery: true
  },
  extends: [
    'plugin:jest/recommended',
    'standard'
  ],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 6,
    requireConfigFile: true,
    sourceType: "module"
  },
  plugins: [],
  rules: {
    'camelcase': 0,
    'jest/expect-expect': 0,
    'jest/no-mocks-import': 1,
    'no-return-assign': 0,
    'space-before-function-paren': 0
  }
}
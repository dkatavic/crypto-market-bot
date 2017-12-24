module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 2017,
  },
  // prettierOptions: {
  //   printWidth: 100
  // },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    indent: ["error", 2],
    semi: ["error", "never"],
    'no-console': 1
  }
};
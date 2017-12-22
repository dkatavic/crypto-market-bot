module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    indent: ["error", 2],
    semi: ["error", "never"]
  }
};

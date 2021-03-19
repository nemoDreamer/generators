// cspell:ignore plusplus, linebreak
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "max-len": ["error", { code: 80, ignoreTrailingComments: true }],
    "no-plusplus": "off",
    "implicit-arrow-linebreak": "off",
    "newline-per-chained-call": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/__{tests,fixtures}__/**",
          "**/*.test.js",
          "**/*.spec.js",
          "*.config.js",
        ],
      },
    ],
  },
};

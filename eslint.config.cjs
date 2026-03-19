const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  // 🔥 Config de base
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,     // les globals Node standard
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
    }
  },

  // 🔥 Config spéciale pour Jest
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // contient test, expect, describe, etc.
      },
    },
  },
];
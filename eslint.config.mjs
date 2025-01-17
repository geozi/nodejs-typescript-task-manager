import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import mocha from "eslint-plugin-mocha";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs}"], languageOptions: { sourceType: "commonjs" } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { languageOptions: { globals: globals.node } },
  {
    files: ["**/*.test.js"],
    languageOptions: { globals: { ...globals.mocha } },
    plugins: { mocha: mocha },
    rules: {
      ...mocha.configs.recommended.rules,
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);

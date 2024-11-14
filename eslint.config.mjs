/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  { ignores: ["**/dist/"] },
  {
    rules: {
      "eqeqeq": "warn",
      "spaced-comment": ["error", "always", { markers: ["/"] }],
      "capitalized-comments": ["error", "always"]
    }
  }
];

export default {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals", // Next.js recommended rules
    "eslint:recommended", // General ESLint recommended rules
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:prettier/recommended", // Prettier integration
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "warn", // Show Prettier issues as warnings
    "react/react-in-jsx-scope": "off", // Next.js doesn't require importing React
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignore unused variables starting with "_"
    "no-console": "warn", // Warn about console logs
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    next: {
      rootDir: ["src/"],
    },
  },
};

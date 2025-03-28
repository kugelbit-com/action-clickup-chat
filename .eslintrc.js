module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked", // Enable type checking, max strictness
    "plugin:prettier/recommended" // prettier rules
  ],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },

  plugins: ["@typescript-eslint"],

  root: true,

  ignorePatterns: [
    ".eslintrc.js",
    "*.spec.ts",
    "*.test.ts",
    "dist/",
    "coverage/",
    "lib/",
    "pnpm-lock.yaml",
    ".pnpm-store/",
  ], // ESLINT IGNORE

  env: {
    // ESLINT ENV
    node: true,
    jest: true
  },

  rules: {
    "no-else-return": ["error", { allowElseIf: false }],
    "consistent-return": "error",
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "class",
        format: ["PascalCase"]
      }
    ],
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "no-public",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit"
        }
      }
    ]
  }
};

import type { Config } from "jest";

const config: Config = {
  // Ensures Jest uses jsdom (for React DOM testing)
  testEnvironment: "jsdom",

  // Run this setup file after environment setup
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Transform TypeScript and JSX files using babel-jest
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },

  // Support for path aliases like `@/components/...`
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mock styles
     "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts"
  },

  // File extensions Jest should resolve
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Clear mocks before each test
  clearMocks: true,

  // Collect coverage data
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // Coverage threshold (optional strict mode)
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },

  // Detect test files
  testMatch: ["**/__tests__/**/*.(spec|test).[tj]s?(x)"],

  // Verbose output
  verbose: true,
};

export default config;

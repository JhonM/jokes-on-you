import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.spec.ts",
    "<rootDir>/frontend/**/__tests__/**/*.spec.ts",
  ],
};

export default config;

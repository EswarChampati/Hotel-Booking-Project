import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    environment: "node",
    include: ["src/tests/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      reportsDirectory: "coverage",
    },
  },
});

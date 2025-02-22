"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
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

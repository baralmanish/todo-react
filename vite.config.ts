/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    alias: [
      {
        find: "react-redux/es/exports",
        replacement: path.resolve(__dirname, "./node_modules/react-redux/lib/exports")
      }
    ]
  }
});

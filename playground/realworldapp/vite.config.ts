import { defineConfig } from "vite";
import { hono } from "core/vite";
import adapter from "adapter-node";
import path from "node:path";

export default defineConfig({
  plugins: [hono({ adapter: adapter() })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
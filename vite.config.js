import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "Kansei",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    cors: true,
  },
  build: {
    outDir: "../dist",
    sourcemap: false,
    minify: "esbuild",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Группировать все React-related и UI библиотеки в vendor
          if (
            id.includes("react") ||
            id.includes("@mui") ||
            id.includes("emotion")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});

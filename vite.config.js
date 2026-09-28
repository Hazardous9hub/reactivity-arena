import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Relative paths for seamless GitHub Pages deployment
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,
    port: 5173
  }
});

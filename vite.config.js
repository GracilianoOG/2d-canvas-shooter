import { defineConfig } from "vite";

export default defineConfig ({
  root: "src",
  build: {
    assetsInlineLimit: 2048,
    outDir: "../dist",
    emptyOutDir: true
  }
});
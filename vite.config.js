import { defineConfig } from "vite";

export default defineConfig ({
  root: "src",
  publicDir: "../public",
  build: {
    // Limit of asset size to be transformed into base64
    // assetsInlineLimit: 2048,
    outDir: "../dist",
    emptyOutDir: true
  }
});
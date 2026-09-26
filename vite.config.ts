import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:6688",
        // target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/core": {
        target: "http://91.107.232.169:7700",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/core/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
});

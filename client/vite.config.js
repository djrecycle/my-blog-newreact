import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    // outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        // "https://my-blog-react-yeio.vercel.app"
        // "http://rraangga.infinityfreeapp.com",
        // target: "https://my-blog-react-yeio.vercel.app/",
        secure: false,
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "@/": path.resolve(__dirname, "./src/components"),
    },
  },
});

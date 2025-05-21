import { defineConfig } from "vite";

import { vitePostHtml, viteMinifyHtml } from "./src/config/html";
// import { viteSvgSprtie } from "./src/config/sprite";

import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  root: "src",
  base: "./",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },

  server: {
    port: 3000,
    open: true,
  },

  plugins: [
    vitePostHtml,
    viteMinifyHtml,
    // viteSvgSprtie,

    viteImagemin({
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      mozjpeg: { quality: 80 },
      webp: { quality: 80 },
      svgo: { plugins: [{ name: "removeViewBox", active: false }] },
    }),
  ],

  css: {
    postcss: { plugins: [require("autoprefixer")] },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  },

  resolve: { alias: { "@": "/src" } },
});

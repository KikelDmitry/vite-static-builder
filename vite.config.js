import { defineConfig } from "vite";
import path from "node:path";

import posthtml from "@vituum/vite-plugin-posthtml";
import expressions from "posthtml-expressions";
import modules from "posthtml-modules";

import { createSvgSpritePlugin } from "vite-plugin-svg-sprite";
import viteImagemin from "vite-plugin-imagemin";
import minifyHtml from "vite-plugin-minify-html";

export default defineConfig({
  root: "src",
  base: "./",

  plugins: [
    posthtml({
      plugins: [
        expressions({
          locals: {
            timeStamp: Date.now(),
          },
        }),

        modules({
          root: path.resolve(process.cwd(), "src/html"),
        }),
      ],
    }),

    // createSvgSpritePlugin({
    //   include: ["src/assets/images/spirte/**/*.svg"],
    //   symbolId: "icon-[name]",
    //   svgoOptions: { plugins: ["removeDimensions"] },
    // }),

    viteImagemin({
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      mozjpeg: { quality: 80 },
      webp: { quality: 80 },
      svgo: { plugins: [{ name: "removeViewBox", active: false }] },
    }),

    minifyHtml({
      minifyOptions: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
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

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },

  server: { port: 3000, open: true },
});

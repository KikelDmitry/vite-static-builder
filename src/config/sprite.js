import { createSvgSpritePlugin } from "vite-plugin-svg-sprite";

export const viteSvgSprtie = createSvgSpritePlugin({
  include: ["src/assets/images/spirte/**/*.svg"],
  symbolId: "icon-[name]",
  svgoOptions: { plugins: ["removeDimensions"] },
});

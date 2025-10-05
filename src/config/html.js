import path from 'node:path';
import posthtml from '@vituum/vite-plugin-posthtml';
import expressions from 'posthtml-expressions';
import modules from 'posthtml-modules';
import minifyHtml from 'vite-plugin-minify-html';
import { CONFIG as config } from './project';
import { DATA as data } from '../data';

const locals = {
  timeStamp: Date.now(),
  config,
  data,
};

export const vitePostHtml = posthtml({
  root: './',
  plugins: [
    expressions({
      locals,
    }),

    modules({
      root: path.resolve(process.cwd(), 'src/html'),
      locals,
    }),
  ],
});

export const viteMinifyHtml = minifyHtml({
  minifyOptions: {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  },
});

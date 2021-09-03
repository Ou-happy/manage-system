import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // 指定传递给 CSS 预处理器的选项 https://www.vitejs.net/config/#css-preprocessoroptions
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/mixins/mixins.scss";`
      }
    }
  },
  server: {
    host: '10.9.105.111',
    port: 9270,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //   },
    // },
  },
  plugins: [vue()],
});

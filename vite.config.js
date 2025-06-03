// @ts-nocheck
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';

export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server: {
    // 服务器主机名，默认是 localhost
    host: 'localhost',
    // 端口号，默认是 5173
    port: 8000,
    // 是否开启 https
    https: false,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/api/v1',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // 是否开启自动刷新
    hmr: true,
    // 是否开启自动打开浏览器
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.vue']
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75,
          propList: ['*'],
          minPixelValue: 2,
          selectorBlackList: ['.van']
        }),
        autoprefixer({})
      ]
    },
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        //支持直接使用表达式 width: 100px - 20px;得到值为width:80px;
        math: 'always'
      }
    }
  },
  build: {
    outDir: 'dist',
    // 生产环境是否生成 source map 文件
    sourcemap: false
  }
});

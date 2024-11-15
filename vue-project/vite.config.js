import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://bookkeeping-1.onrender.com', // 你的後端 API 服務
        changeOrigin: true, // 如果你的 API 是跨域的，這會修改來源
        rewrite: (path) => path.replace(/^\/api/, '') // 如果你想移除 `/api` 前綴
      }
    }
  }
})

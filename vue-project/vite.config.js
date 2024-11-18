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
  }
  /*
  server: {
    proxy: {
      '/expenses': {
        target: 'https://bookkeeping-1.onrender.com',
        changeOrigin: true,
        secure: false, // 若後端是 HTTPS，但沒有有效的 SSL 憑證，可以加這行
      }
    }
  }*/
})

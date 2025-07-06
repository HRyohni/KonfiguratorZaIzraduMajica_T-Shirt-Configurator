import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy za Malfini
      '/malfini-proxy': {
        target: 'https://shop.malfini.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/malfini-proxy/, ''),
      },
      // Proxy za Sol's
      '/sols-proxy': {
        target: 'https://s7g3.scene7.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sols-proxy/, ''),
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // main.tsx'in yeni konumunu Vite'a bildiriyoruz
  root: '.',
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})

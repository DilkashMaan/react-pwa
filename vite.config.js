import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'https://pwa-backend-rw9x.onrender.com',
        changeOrigin: true,
        secure: false, // Set true if the backend has a valid SSL
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': 'http://localhost:5000/api', // Replace with your backend API's URL
      '/api': 'https://web-trivia.onrender.com/api', // Replace with your backend API's URL
    }
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Tells Vite to listen on all local IPs
    port: 5173,
    cors: true, // Allows the ngrok domain to request the internal assets
    strictPort: true, // Fails if the port is already in use, preventing silent errors
    // If you are using a very recent version of Vite (5.3+), you can also add:
    allowedHosts: true,
  }
})

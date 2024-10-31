import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Add this if you need to specify a specific port for local development
    port: 3000,
  },
  build: {
    outDir: 'dist', // Ensure this matches your deployment target
  },
  // Add this to handle routing correctly
  base: '/',
});

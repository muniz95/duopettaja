import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      'src': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_'
});
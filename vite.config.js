import { defineConfig } from 'vite'
import process from 'process'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: process.cwd(),
  plugins: [svelte()],
  server: {
    port: 5000
  },
  build: {
    outDir: process.cwd()
  }
})

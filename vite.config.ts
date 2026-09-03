import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative asset URLs work on both GitHub Pages project sites and custom domains.
  base: './',
  plugins: [react()],
})

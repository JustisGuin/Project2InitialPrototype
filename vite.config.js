import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Project2InitialPrototype/',

  build: {
    outDir: 'docs', 
  },

  plugins: [vue()],
})

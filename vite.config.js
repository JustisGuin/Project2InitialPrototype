import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Project2InitialPrototype/',
  build: {
  },
  plugins: [vue()],
    scripts: {
      build : "vite build",
      preview: "vite preview"
    }
})

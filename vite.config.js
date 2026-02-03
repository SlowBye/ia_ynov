import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// On utilise une fonction qui reçoit l'argument 'command'
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss()],
    base: command === 'build' ? '/ia_ynov/' : '/',
  }
})
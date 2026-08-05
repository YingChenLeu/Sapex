import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Vendor islands (firebase, syntax-highlighter) legitimately exceed 500 kB;
    // route-level code splitting keeps them off the critical path where possible.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('firebase') || id.includes('@firebase')) return 'firebase'
          if (id.includes('three')) return 'three'
          if (id.includes('recharts') || id.includes('d3-')) return 'recharts'
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('ogl')) return 'ogl'
          if (id.includes('katex')) return 'katex'
          if (id.includes('emoji-picker-react')) return 'emoji-picker'
          if (id.includes('react-syntax-highlighter') || id.includes('refractor') || id.includes('highlight.js') || id.includes('prismjs')) {
            return 'syntax-highlighter'
          }
          if (id.includes('@radix-ui')) return 'radix'
          if (id.includes('@tabler/icons-react') || id.includes('lucide-react') || id.includes('react-icons')) {
            return 'icons'
          }
        },
      },
    },
  },
})

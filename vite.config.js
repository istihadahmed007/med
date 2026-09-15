import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                med: {
                  950: '#050811',
                  900: '#0a1020',
                  850: '#0e172e',
                  800: '#141f3d',
                  700: '#1e2c52',
                  600: '#2c3e6f',
                  accent: {
                    blue: '#2563eb',
                    electric: '#38bdf8',
                    cyan: '#06b6d4',
                    teal: '#14b8a6',
                    emerald: '#10b981',
                    rose: '#f43f5e',
                    amber: '#f59e0b',
                    purple: '#8b5cf6',
                  }
                }
              },
              boxShadow: {
                'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
                'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.3)',
                'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              }
            }
          }
        }),
        autoprefixer()
      ]
    }
  },
  server: {
    port: 3000,
    host: true,
  }
});

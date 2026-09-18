import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Dev API plugin ensures that Vite SPA server never serves index.html (<!DOCTYPE) for /api requests
const devApiFallbackPlugin = () => ({
  name: 'dev-api-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url || '';
      if (url.startsWith('/api/') || url === '/api') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-medx-role');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (url.startsWith('/api/health')) {
          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'healthy', environment: 'vite-dev' }));
          return;
        }

        if (url.startsWith('/api/video-studio/library')) {
          res.statusCode = 200;
          try {
            const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
            if (fs.existsSync(dbPath)) {
              const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
              res.end(JSON.stringify(data.medicalVideos || []));
              return;
            }
          } catch (e) {
            // fallback
          }
          res.end(JSON.stringify([]));
          return;
        }

        if (url.startsWith('/api/video-studio/published')) {
          res.statusCode = 200;
          res.end(JSON.stringify([]));
          return;
        }

        if (url.startsWith('/api/video-studio/jobs')) {
          res.statusCode = 200;
          res.end(JSON.stringify([]));
          return;
        }

        if (url.startsWith('/api/video-studio/progress')) {
          res.statusCode = 200;
          res.end(JSON.stringify(null));
          return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Dev API active', path: url }));
        return;
      }
      next();
    });
  }
});

export default defineConfig({
  base: './',
  plugins: [react(), devApiFallbackPlugin()],
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

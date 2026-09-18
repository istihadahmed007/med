import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VokaSyncService } from './server/services/vokaSyncService.js';

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

        if (url.startsWith('/api/video-studio/taxonomy')) {
          res.statusCode = 200;
          try {
            const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
            if (fs.existsSync(dbPath)) {
              const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
              res.end(JSON.stringify({ taxonomy: data.videoTaxonomy || {}, totalVideos: (data.medicalVideos || []).length }));
              return;
            }
          } catch (e) {}
          res.end(JSON.stringify({ taxonomy: {}, totalVideos: 0 }));
          return;
        }

        if (url.startsWith('/api/video-studio/library') || url.startsWith('/api/video-studio/videos')) {
          res.statusCode = 200;
          try {
            const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
            if (fs.existsSync(dbPath)) {
              const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
              let videos = Array.isArray(data) ? data : (data.medicalVideos || []);
              const parsed = new URL('http://localhost' + url);
              const category = parsed.searchParams.get('category');
              const collection = parsed.searchParams.get('collection');
              const subtopic = parsed.searchParams.get('subtopic') || parsed.searchParams.get('topic');
              const query = parsed.searchParams.get('query') || parsed.searchParams.get('search');
              if (category && category !== 'all' && category !== 'All') {
                videos = videos.filter(v => v.category && v.category.toLowerCase() === category.toLowerCase());
              }
              if (collection && collection !== 'all' && collection !== 'All') {
                videos = videos.filter(v => v.collection && v.collection.toLowerCase() === collection.toLowerCase());
              }
              if (subtopic && subtopic !== 'all' && subtopic !== 'All') {
                const s = subtopic.toLowerCase();
                videos = videos.filter(v => (v.subtopic && v.subtopic.toLowerCase() === s) || (Array.isArray(v.topics) && v.topics.some(t => t.toLowerCase() === s)));
              }
              if (query && query.trim()) {
                const q = query.toLowerCase().trim();
                videos = videos.filter(v => (v.title && v.title.toLowerCase().includes(q)) || (v.description && v.description.toLowerCase().includes(q)));
              }
              res.end(JSON.stringify(videos));
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
          try {
            const dbPath = path.resolve(process.cwd(), 'server', 'data', 'medx_db.json');
            if (fs.existsSync(dbPath)) {
              const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
              const parsed = new URL('http://localhost' + url);
              const lessonId = parsed.searchParams.get('lessonId');
              let published = (data.lessonVideos || []).filter(v => v.publicationStatus === 'published');
              if (lessonId) {
                published = published.filter(v =>
                  v.lessonId === lessonId ||
                  (lessonId === 'cvs-physio-cardiac-cycle-wiggers' && v.lessonId === 'cv-004') ||
                  (lessonId === 'cv-004' && v.lessonId === 'cvs-physio-cardiac-cycle-wiggers')
                );
              }
              res.end(JSON.stringify(published));
              return;
            }
          } catch (e) {}
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

        // VOKA YouTube Official Channel Endpoints
        if (url.startsWith('/api/video-studio/sources/voka/sync')) {
          const role = req.headers['x-medx-role'] || 'faculty';
          if (role !== 'faculty' && role !== 'admin' && role !== 'reviewer') {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: 'Unauthorized. Only faculty or admin can trigger synchronization.' }));
            return;
          }
          VokaSyncService.syncChannel(process.env.YOUTUBE_API_KEY)
            .then(result => {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, ...result }));
            })
            .catch(err => {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            });
          return;
        }

        if (url.startsWith('/api/video-studio/sources/voka/candidates')) {
          res.statusCode = 200;
          res.end(JSON.stringify(VokaSyncService.getCandidates()));
          return;
        }

        if (url.startsWith('/api/video-studio/sources/voka/publish') && req.method === 'POST') {
          const role = req.headers['x-medx-role'] || 'faculty';
          if (role !== 'faculty' && role !== 'admin' && role !== 'reviewer') {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: 'Unauthorized. Only faculty or admin can publish videos.' }));
            return;
          }
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const reviewerName = req.headers['x-reviewer-name'] || 'Prof. Dr. Tariqul Islam, MBBS, PhD';
              const record = VokaSyncService.publishCandidate(payload, { name: reviewerName, role: 'Senior Faculty Reviewer' });
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, video: record }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/video-studio/sources/voka/reject') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const candidates = VokaSyncService.getCandidates();
              const filtered = candidates.filter(c => c.id !== payload.id && c.youtubeVideoId !== payload.youtubeVideoId);
              const candidatesPath = path.resolve(process.cwd(), 'server', 'data', 'voka_candidates.json');
              fs.writeFileSync(candidatesPath, JSON.stringify(filtered, null, 2), 'utf8');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, remaining: filtered.length }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/video-studio/sources/voka/health-check')) {
          VokaSyncService.runHealthCheck()
            .then(stats => {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, ...stats }));
            })
            .catch(err => {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            });
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

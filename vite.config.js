import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VokaSyncService } from './server/services/vokaSyncService.js';
import { TextbookService } from './server/services/textbookService.js';
import { DrugService } from './server/services/drugService.js';
import { DrugImportService } from './server/services/drugImportService.js';
import { verifySessionUser, requireAuth, requireRole } from './server/services/authVerifier.js';

// Dev API plugin ensures that Vite SPA server never serves index.html (<!DOCTYPE) for /api requests
const devApiFallbackPlugin = () => ({
  name: 'dev-api-fallback',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url || '';
      if (url.startsWith('/api/') || url === '/api') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

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

        if (url.startsWith('/api/auth/me')) {
          const user = await verifySessionUser(req);
          if (!user) {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: 'Unauthorized: Valid authenticated session token required.' }));
            return;
          }
          res.statusCode = 200;
          res.end(JSON.stringify(user));
          return;
        }

        if (url.startsWith('/api/auth/role')) {
          res.statusCode = 403;
          res.end(JSON.stringify({ error: 'Forbidden: Browser-controlled role switching is prohibited. Roles are enforced strictly by session tokens and database Row Level Security.' }));
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
          const user = await requireRole(req, res, ['faculty', 'admin', 'reviewer']);
          if (!user) return;
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
          const user = await requireRole(req, res, ['faculty', 'admin', 'reviewer']);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const reviewerName = user.name || 'Verified Faculty Reviewer';
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

        // Textbook Library Endpoints
        if (url.startsWith('/api/textbooks/user-uploads')) {
          const user = await requireAuth(req, res);
          if (!user) return;
          res.statusCode = 200;
          res.end(JSON.stringify(TextbookService.getUserUploads(user.id)));
          return;
        }

        if (url.startsWith('/api/textbooks/') && req.method === 'GET') {
          const id = url.split('?')[0].replace('/api/textbooks/', '');
          const user = await verifySessionUser(req);
          const book = TextbookService.getTextbookById(id, user?.id);
          if (book) {
            res.statusCode = 200;
            res.end(JSON.stringify(book));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Textbook not found' }));
          }
          return;
        }

        if (url.startsWith('/api/textbooks') && req.method === 'GET') {
          const parsed = new URL('http://localhost' + url);
          const query = parsed.searchParams.get('query') || '';
          const phase = parsed.searchParams.get('phase') || 'all';
          const subject = parsed.searchParams.get('subject') || 'all';
          const accessType = parsed.searchParams.get('accessType') || 'all';
          const includePrivate = parsed.searchParams.get('includePrivate') === 'true';
          const user = await verifySessionUser(req);

          const results = TextbookService.getTextbooks({
            query,
            phase,
            subject,
            accessType,
            userId: user?.id,
            includePrivate: Boolean(includePrivate && user)
          });
          res.statusCode = 200;
          res.end(JSON.stringify(results));
          return;
        }

        // Textbook Import Workflow Endpoints
        if (url.startsWith('/api/textbook-import/fetch-metadata') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const results = await TextbookService.fetchOnlineMetadata(payload.query || payload.isbn || '');
              res.statusCode = 200;
              res.end(JSON.stringify(results));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/textbook-import/submit-job') && req.method === 'POST') {
          const user = await requireAuth(req, res);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const job = TextbookService.submitJob({
                ...payload,
                ownerId: user.id,
                ownerRole: user.role
              });
              res.statusCode = 201;
              res.end(JSON.stringify({ success: true, job }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/textbook-import/jobs') && req.method === 'GET') {
          const user = await requireAuth(req, res);
          if (!user) return;
          const jobs = TextbookService.getJobs({ ownerId: user.id, role: user.role });
          res.statusCode = 200;
          res.end(JSON.stringify(jobs));
          return;
        }

        if (url.includes('/retry') && url.startsWith('/api/textbook-import/jobs/') && req.method === 'POST') {
          const parts = url.split('/');
          const jobId = parts[4];
          try {
            const retried = TextbookService.retryJob(jobId);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, job: retried }));
          } catch (err) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (url.includes('/review') && url.startsWith('/api/textbook-import/jobs/') && req.method === 'POST') {
          const user = await requireRole(req, res, ['faculty', 'admin', 'reviewer']);
          if (!user) return;
          const parts = url.split('/');
          const jobId = parts[4];
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const reviewerName = user.name || 'Verified Faculty Reviewer';
              const reviewed = TextbookService.reviewJob(jobId, payload.action, payload.reviewNotes, { name: reviewerName });
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, job: reviewed }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Drug Reference & Pharmacology Study Centre Endpoints
        if (url === '/api/drugs/stats' && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getDatabaseStats()));
          return;
        }

        if (url === '/api/drugs/dosage-forms' && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getDosageForms()));
          return;
        }

        if (url.startsWith('/api/drugs/search') && req.method === 'GET') {
          const parsed = new URL('http://localhost' + url);
          const q = parsed.searchParams.get('q') || '';
          const filterType = parsed.searchParams.get('type') || 'all';
          const therapeuticClass = parsed.searchParams.get('class') || '';
          const indication = parsed.searchParams.get('indication') || '';
          const manufacturerId = parsed.searchParams.get('manufacturer') || '';
          const letter = parsed.searchParams.get('letter') || '';
          const dosageForm = parsed.searchParams.get('form') || '';
          const strength = parsed.searchParams.get('strength') || '';
          const prescriptionStatus = parsed.searchParams.get('prescription') || '';
          const activeStatus = parsed.searchParams.get('status') || '';
          const page = parsed.searchParams.get('page') || 1;
          const limit = parsed.searchParams.get('limit') || 15;

          const results = DrugService.searchDrugs({
            query: q,
            filterType,
            therapeuticClass,
            indication,
            manufacturerId,
            letter,
            dosageForm,
            strength,
            prescriptionStatus,
            activeStatus,
            page,
            limit
          });
          res.statusCode = 200;
          res.end(JSON.stringify(results));
          return;
        }

        if (url.startsWith('/api/drugs/brand/') && req.method === 'GET') {
          const slug = url.split('?')[0].replace('/api/drugs/brand/', '');
          const detail = DrugService.getBrandDetail(slug);
          if (detail) {
            res.statusCode = 200;
            res.end(JSON.stringify(detail));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Bangladesh brand product not found' }));
          }
          return;
        }

        if (url.startsWith('/api/generics/') && url.includes('/brands') && req.method === 'GET') {
          const slug = url.split('?')[0].replace('/api/generics/', '').replace('/brands', '');
          const brands = DrugService.getBrandsForGeneric(slug);
          res.statusCode = 200;
          res.end(JSON.stringify(brands));
          return;
        }

        if (url.startsWith('/api/generics/') && req.method === 'GET') {
          const slug = url.split('?')[0].replace('/api/generics/', '');
          const generic = DrugService.getGenericBySlug(slug);
          if (generic) {
            res.statusCode = 200;
            res.end(JSON.stringify(generic));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Generic medicine monograph not found' }));
          }
          return;
        }

        if (url.startsWith('/api/brands/') && req.method === 'GET') {
          const slug = url.split('?')[0].replace('/api/brands/', '');
          const brand = DrugService.getBrandBySlug(slug);
          if (brand) {
            res.statusCode = 200;
            res.end(JSON.stringify(brand));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Bangladesh brand product not found' }));
          }
          return;
        }

        if (url.startsWith('/api/interactions/check') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const ids = Array.isArray(payload.ids) ? payload.ids : (Array.isArray(payload.genericIds) ? payload.genericIds : []);
              const report = DrugService.checkInteractions(ids);
              res.statusCode = 200;
              res.end(JSON.stringify(report));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/drugs/compare') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const ids = Array.isArray(payload.genericIds) ? payload.genericIds : [];
              const matrix = DrugService.compareDrugs(ids);
              res.statusCode = 200;
              res.end(JSON.stringify(matrix));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/drug-classes') && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getTherapeuticClasses()));
          return;
        }

        if (url.startsWith('/api/guidelines') && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getGuidelines()));
          return;
        }

        if (url.startsWith('/api/investigations') && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getInvestigations()));
          return;
        }

        if (url.startsWith('/api/comparisons') && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getPreconfiguredComparisons()));
          return;
        }

        if (url.startsWith('/api/me/drug-bookmarks') && req.method === 'GET') {
          const user = await requireAuth(req, res);
          if (!user) return;
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getUserBookmarks(user.id)));
          return;
        }

        if (url.startsWith('/api/me/drug-bookmarks') && req.method === 'POST') {
          const user = await requireAuth(req, res);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const result = DrugService.toggleUserBookmark(user.id, payload);
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/me/drug-notes') && req.method === 'GET') {
          const user = await requireAuth(req, res);
          if (!user) return;
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getUserNotes(user.id)));
          return;
        }

        if (url.startsWith('/api/me/drug-notes') && req.method === 'POST') {
          const user = await requireAuth(req, res);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const saved = DrugService.saveUserNote(user.id, payload.drugId, payload.note);
              res.statusCode = 200;
              res.end(JSON.stringify(saved));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/me/recent-drugs') && req.method === 'GET') {
          const user = await requireAuth(req, res);
          if (!user) return;
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getRecentDrugs(user.id)));
          return;
        }

        if (url.startsWith('/api/me/recent-drugs') && req.method === 'POST') {
          const user = await requireAuth(req, res);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const list = DrugService.trackRecentDrug(user.id, payload);
              res.statusCode = 200;
              res.end(JSON.stringify(list));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/drugs/governance/audit-logs') && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugService.getAuditLogs()));
          return;
        }

        if (url.startsWith('/api/drugs/governance/report-correction') && req.method === 'POST') {
          const user = await requireAuth(req, res);
          if (!user) return;
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const report = DrugService.reportCorrection(user.id, payload);
              res.statusCode = 201;
              res.end(JSON.stringify({ success: true, report }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Drug Ingestion & Import Management Endpoints
        if (url === '/api/drugs/import/start' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              let records = parsed.records || [];
              if (parsed.csvText) {
                records = DrugImportService.parseCsv(parsed.csvText);
              } else if (parsed.jsonText) {
                records = DrugImportService.parseJson(parsed.jsonText);
              }
              const job = await DrugImportService.startImportJob({
                adapterType: parsed.adapterType || 'json',
                sourceName: parsed.sourceName || 'Authorized Admin Import',
                sourceLicence: parsed.sourceLicence || 'Open Government / Permitted License',
                records,
                apiConfig: parsed.apiConfig || null,
                batchSize: parsed.batchSize || 250,
                dryRun: parsed.dryRun === true,
                adminUser: { id: clientId, name: 'Administrator' }
              });
              res.statusCode = 200;
              res.end(JSON.stringify(job));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url === '/api/drugs/import/jobs' && req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify(DrugImportService.loadJobs()));
          return;
        }

        if (url.startsWith('/api/drugs/import/jobs/') && url.includes('/errors') && req.method === 'GET') {
          const jobId = url.split('?')[0].replace('/api/drugs/import/jobs/', '').replace('/errors', '');
          const parsed = new URL('http://localhost' + url);
          const format = parsed.searchParams.get('format') || 'json';
          if (format === 'csv') {
            const csv = DrugImportService.exportErrorsAsCsv(jobId);
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="import-errors-${jobId}.csv"`);
            res.statusCode = 200;
            res.end(csv);
          } else {
            const errors = DrugImportService.getErrorsForJob(jobId);
            res.statusCode = 200;
            res.end(JSON.stringify(errors));
          }
          return;
        }

        if (url.startsWith('/api/drugs/import/jobs/') && url.includes('/retry') && req.method === 'POST') {
          const jobId = url.split('?')[0].replace('/api/drugs/import/jobs/', '').replace('/retry', '');
          DrugImportService.retryFailedJob(jobId)
            .then(job => {
              res.statusCode = 200;
              res.end(JSON.stringify(job));
            })
            .catch(err => {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            });
          return;
        }

        if (url === '/api/drugs/admin/drug/archive' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              if (!payload.confirmed) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Archive operation requires explicit confirmation: { confirmed: true }' }));
                return;
              }
              const archived = DrugService.archiveBrand(payload.brandId, payload.reason || 'Admin archival', clientId);
              res.statusCode = 200;
              res.end(JSON.stringify(archived));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Global Search Endpoint (searches across drugs + study materials)
        if (url.startsWith('/api/search/global') && req.method === 'GET') {
          const parsed = new URL('http://localhost' + url);
          const q = (parsed.searchParams.get('q') || '').trim().toLowerCase();
          const limit = parseInt(parsed.searchParams.get('limit') || '20', 10);

          if (!q || q.length < 2) {
            res.statusCode = 200;
            res.end(JSON.stringify({ query: q, results: { topics: [], generics: [], brands: [], manufacturers: [] } }));
            return;
          }

          const drugDb = DrugService.loadDb();
          const results = { topics: [], generics: [], brands: [], manufacturers: [] };

          // Search generics
          for (const g of (drugDb.generics || [])) {
            if (results.generics.length >= limit) break;
            if ((g.name || '').toLowerCase().includes(q) ||
                (g.normalizedName || '').includes(q) ||
                (g.nameBn || '').includes(q)) {
              results.generics.push({ id: g.id, title: g.name, subtitle: g.therapeuticClass || g.pharmacologicalClass || '', type: 'generic' });
            }
          }

          // Search brands
          for (const b of (drugDb.brands || [])) {
            if (results.brands.length >= limit) break;
            if ((b.brandName || '').toLowerCase().includes(q) ||
                (b.slug || '').includes(q)) {
              results.brands.push({ id: b.id, title: b.brandName, subtitle: `${b.strength || ''} ${b.dosageForm || ''} — ${b.manufacturerName || ''}`.trim(), type: 'brand', genericId: b.genericId });
            }
          }

          // Search manufacturers
          for (const m of (drugDb.manufacturers || [])) {
            if (results.manufacturers.length >= limit) break;
            if ((m.name || '').toLowerCase().includes(q) ||
                (m.shortName || '').toLowerCase().includes(q)) {
              results.manufacturers.push({ id: m.id, title: m.name, subtitle: m.headquarters || '', type: 'manufacturer' });
            }
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ query: q, results }));
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

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
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
    watch: {
      ignored: ['**/server/data/**', '**/public/data/**', '**/scratch/**']
    }
  }
}));

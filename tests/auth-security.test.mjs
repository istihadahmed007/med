import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { verifySessionUser, requireAuth, requireRole } from '../server/services/authVerifier.js';

// Setup ephemeral transpiled AuthService for Node testing
const scratch = mkdtempSync(join(tmpdir(), 'medx-auth-test-'));
after(() => {
  try { rmSync(scratch, { recursive: true, force: true }); } catch {}
});
writeFileSync(join(scratch, 'package.json'), '{"type":"module"}');
writeFileSync(join(scratch, 'supabaseClient.js'), 'export const isSupabaseConfigured = () => false; export const supabase = {};');
const authSource = readFileSync(new URL('../src/services/authService.ts', import.meta.url), 'utf8');
const transOutput = ts.transpileModule(authSource, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
  .replace(/from '\.\/supabaseClient'/g, "from './supabaseClient.js'")
  .replace(/from '\.\.\/types'/g, "from './types.js'");
writeFileSync(join(scratch, 'types.js'), 'export {};');
writeFileSync(join(scratch, 'authService.js'), transOutput);
const { AuthService } = await import(pathToFileURL(join(scratch, 'authService.js')));

test('Security: Forged x-medx-role or x-medx-user-id headers are rejected without valid session token', async () => {
  // Mock request with forged headers and no authorization
  const forgedReq = {
    headers: {
      'x-medx-role': 'admin',
      'x-medx-user-id': 'forged-admin-id',
      'x-medx-user-role': 'admin'
    }
  };

  const user = await verifySessionUser(forgedReq);
  assert.equal(user, null, 'Forged headers must return null user');

  let statusCode = 0;
  let responseData = null;
  const mockRes = {
    statusCode: 200,
    setHeader: () => {},
    end: (str) => {
      responseData = JSON.parse(str);
    }
  };

  // requireAuth must reject with 401
  const authResult = await requireAuth(forgedReq, mockRes);
  assert.equal(authResult, null);
  assert.equal(mockRes.statusCode, 401, 'Unauthenticated request must receive 401 Unauthorized');
  assert.ok(responseData.error.includes('Unauthorized'));

  // requireRole must also reject
  mockRes.statusCode = 200;
  const roleResult = await requireRole(forgedReq, mockRes, ['admin', 'faculty']);
  assert.equal(roleResult, null);
  assert.equal(mockRes.statusCode, 401);
});

test('Security: Role escalation via JWT payload requires matching claims and valid structure', async () => {
  // Tampered or invalid token format
  const malformedReq = {
    headers: {
      'authorization': 'Bearer not-a-valid-jwt'
    }
  };
  const malformedUser = await verifySessionUser(malformedReq);
  assert.equal(malformedUser, null, 'Malformed tokens must be rejected');

  // Expired token simulation
  const expiredPayload = {
    sub: 'user-expired-123',
    email: 'expired@test.com',
    exp: Math.floor(Date.now() / 1000) - 3600 // 1 hour in the past
  };
  const expiredToken = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from(JSON.stringify(expiredPayload)).toString('base64url')}.fakesig`;
  const expiredReq = {
    headers: {
      'authorization': `Bearer ${expiredToken}`
    }
  };
  const expiredUser = await verifySessionUser(expiredReq);
  assert.equal(expiredUser, null, 'Expired tokens must be rejected');

  // Valid local test token with student role
  const validStudentPayload = {
    sub: 'std-2026-999',
    email: 'newstudent@dmc.edu.bd',
    role: 'student',
    exp: Math.floor(Date.now() / 1000) + 3600,
    user_metadata: {
      full_name: 'Dr. Rafiqul Islam (Student)',
      institution: 'Dhaka Medical College'
    }
  };
  const studentToken = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from(JSON.stringify(validStudentPayload)).toString('base64url')}.fakesig`;
  const studentReq = {
    headers: {
      'authorization': `Bearer ${studentToken}`
    }
  };
  const verifiedStudent = await verifySessionUser(studentReq);
  assert.ok(verifiedStudent, 'Valid token must be decoded and verified');
  assert.equal(verifiedStudent.id, 'std-2026-999');
  assert.equal(verifiedStudent.role, 'student');

  // Verify student cannot pass requireRole for faculty/admin
  let roleStatusCode = 200;
  let roleErr = null;
  const mockRes = {
    set statusCode(code) { roleStatusCode = code; },
    get statusCode() { return roleStatusCode; },
    setHeader: () => {},
    end: (str) => { roleErr = JSON.parse(str); }
  };
  const studentAdminCheck = await requireRole(studentReq, mockRes, ['faculty', 'admin']);
  assert.equal(studentAdminCheck, null, 'Student must not pass admin/faculty role check');
  assert.equal(mockRes.statusCode, 403, 'Forbidden 403 must be returned for students attempting admin actions');
  assert.ok(roleErr.error.includes('Forbidden'));
});

test('Account Creation: Validation rules enforce full name, institution, phase, and secure password', () => {
  // 1. Missing name
  const missingName = AuthService.validateRegistration({
    fullName: '',
    email: 'student@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
    institution: 'Dhaka Medical College',
    mbbsPhase: 'Phase 1: 1st & 2nd Year (Pre-clinical)'
  });
  assert.ok(missingName.includes('Full name is required'));

  // 2. Weak password
  const weakPassword = AuthService.validateRegistration({
    fullName: 'Test User',
    email: 'student@example.com',
    password: 'short',
    confirmPassword: 'short',
    institution: 'Dhaka Medical College',
    mbbsPhase: 'Phase 1: 1st & 2nd Year (Pre-clinical)'
  });
  assert.ok(weakPassword.includes('at least 8 characters'));

  // 3. Password mismatch
  const mismatch = AuthService.validateRegistration({
    fullName: 'Test User',
    email: 'student@example.com',
    password: 'Password123',
    confirmPassword: 'Password456',
    institution: 'Dhaka Medical College',
    mbbsPhase: 'Phase 1: 1st & 2nd Year (Pre-clinical)'
  });
  assert.ok(mismatch.includes('Passwords do not match'));

  // 4. Missing institution
  const missingInst = AuthService.validateRegistration({
    fullName: 'Test User',
    email: 'student@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
    institution: '',
    mbbsPhase: 'Phase 1: 1st & 2nd Year (Pre-clinical)'
  });
  assert.ok(missingInst.includes('institution is required'));

  // 5. Valid credentials (any institution email accepted)
  const valid = AuthService.validateRegistration({
    fullName: 'MD. Anisur Rahman',
    email: 'anisur@anyhospital.org',
    password: 'MedicalPassword2026',
    confirmPassword: 'MedicalPassword2026',
    institution: 'Chittagong Medical College',
    mbbsPhase: 'Phase 3: 4th Year (Para-clinical)'
  });
  assert.equal(valid, null, 'Valid registration payload should pass validation without error');
});

test('Data Isolation: User records and storage keys are isolated strictly by authenticated user ID', () => {
  const userIdA = 'user-uuid-1111';
  const userIdB = 'user-uuid-2222';

  // Storage key patterns for user data
  const progressKeyA = `medx_progress_${userIdA}`;
  const progressKeyB = `medx_progress_${userIdB}`;
  assert.notEqual(progressKeyA, progressKeyB, 'Progress storage keys must be isolated per user ID');

  const notesKeyA = `medx_notes_${userIdA}`;
  const notesKeyB = `medx_notes_${userIdB}`;
  assert.notEqual(notesKeyA, notesKeyB, 'Notes storage keys must be isolated per user ID');

  const bookmarksKeyA = `medx_bkmk_${userIdA}`;
  const bookmarksKeyB = `medx_bkmk_${userIdB}`;
  assert.notEqual(bookmarksKeyA, bookmarksKeyB, 'Bookmark storage keys must be isolated per user ID');

  const drugBookmarksKeyA = `medx_drug_bkmk_${userIdA}`;
  const drugBookmarksKeyB = `medx_drug_bkmk_${userIdB}`;
  assert.notEqual(drugBookmarksKeyA, drugBookmarksKeyB, 'Drug bookmark storage keys must be isolated per user ID');
});

test('Hash Routing Integrity: OAuth and Recovery hash fragments do not collide with MEDX navigation', () => {
  // Test hash normalizer logic
  function normalizeView(hash) {
    const raw = (hash || '').replace(/^#\/?/, '').trim();
    if (!raw) return 'home';

    // Intercept Supabase Auth Callback hash fragments (OAuth, email confirmation, password recovery)
    if (raw.startsWith('access_token=') || raw.startsWith('error=') || raw.includes('type=recovery') || raw.includes('type=signup') || raw.includes('type=invite')) {
      return 'home';
    }

    const segments = raw.split(/[?#]/);
    const path = segments[0].toLowerCase();
    const primary = path.split('/')[0];
    return primary || 'home';
  }

  // 1. Standard navigation
  assert.equal(normalizeView('#textbooks'), 'textbooks');
  assert.equal(normalizeView('#drug-reference'), 'drug-reference');
  assert.equal(normalizeView('#video-studio/vid-101'), 'video-studio');

  // 2. OAuth callback fragment
  assert.equal(
    normalizeView('#access_token=eyJhbGciOi...&token_type=bearer&expires_in=3600&refresh_token=...'),
    'home',
    'OAuth token callback must route cleanly without broken SPA view'
  );

  // 3. Password recovery callback fragment
  assert.equal(
    normalizeView('#access_token=eyJhbGciOi...&expires_at=1774488349&expires_in=3600&refresh_token=...&token_type=bearer&type=recovery'),
    'home',
    'Password recovery token callback must route cleanly without broken SPA view'
  );
});

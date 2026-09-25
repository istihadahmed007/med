# Supabase Auth & PostgreSQL Setup Guide for MEDX

This guide provides instructions to connect the MEDX MBBS platform to your Supabase project.

---

## 1. Create Supabase Project
1. Log in to [Supabase](https://supabase.com) and click **New Project**.
2. Name your project (e.g. `medx-platform`).
3. Set a strong database password and choose your nearest region (e.g., `Singapore` or `India` for South Asia latency).
4. Go to **Project Settings** > **API** and copy:
   - **Project URL** (`https://<project-ref>.supabase.co`)
   - **Anon Public API Key** (`eyJhbGci...`)

---

## 2. Configure Environment Variables
Create or edit `.env` in the root of the project (never commit this file):

```env
# Supabase Persistent Auth and Database
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## 3. Apply PostgreSQL Schema and RLS Policies
1. Open your Supabase Dashboard and click **SQL Editor**.
2. Open or copy the contents of [`supabase/migrations/20260925_auth_and_user_data.sql`](file:///c:/Users/Tonmoy/Pictures/med/supabase/migrations/20260925_auth_and_user_data.sql).
3. Paste into the SQL query runner and click **Run**.
4. This creates:
   - `profiles` table with automatic `on_auth_user_created` trigger assigning new users the `student` role.
   - `faculty_applications` table with stored procedure for protected admin approval.
   - Isolated tables for `user_progress`, `user_bookmarks`, `user_notes`, `user_drug_bookmarks`, `user_mistakes`, `user_spaced_cards`, and `user_uploads`.
   - Comprehensive PostgreSQL Row Level Security (RLS) policies guaranteeing that no student or attacker can read or modify another user's personal data or self-escalate to faculty or admin.

---

## 4. Redirect URLs Configuration
In the Supabase Dashboard, navigate to **Authentication** > **URL Configuration**:

1. Set **Site URL**:
   ```
   https://medx.vartualtutor.com
   ```
2. Under **Redirect URLs**, add:
   ```
   http://localhost:3000
   http://localhost:3000/**
   https://medx.vartualtutor.com
   https://medx.vartualtutor.com/**
   ```
3. Save changes.

---

## 5. Email Confirmation Setup
1. In the Supabase Dashboard, go to **Authentication** > **Providers** > **Email**.
2. Ensure **Confirm email** is enabled if you require confirmation links.
3. Under **Email Templates**:
   - For **Confirm signup**: Subject `Confirm your MEDX Student Account`, redirect URL to `{{ .SiteURL }}`.
   - For **Reset Password**: Subject `Reset your MEDX Password`, redirect URL to `{{ .SiteURL }}`.
4. Note: MEDX does not restrict registration to specific medical college email domains; any valid academic or personal email address is accepted.

---

## 6. Google OAuth Configuration
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select your Google Cloud project.
3. Go to **APIs & Services** > **OAuth consent screen**:
   - Select **External**.
   - Fill in App name (`MEDX MBBS Platform`), user support email, and developer contact.
4. Go to **Credentials** > **Create Credentials** > **OAuth client ID**:
   - Application type: **Web application**.
   - Name: `MEDX Supabase Auth`.
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://medx.vartualtutor.com`
     - `https://<your-project-id>.supabase.co`
   - Authorized redirect URIs:
     - `https://<your-project-id>.supabase.co/auth/v1/callback`
5. Copy the generated **Client ID** and **Client Secret**.
6. In Supabase Dashboard, go to **Authentication** > **Providers** > **Google**:
   - Toggle **Enable Google provider**.
   - Paste **Client ID** and **Client Secret**.
   - Click **Save**.

---

## 7. Role Management & Faculty Governance
- By design, all newly registered accounts receive the `student` role.
- If a user marks "I am a medical faculty member" during registration or requests faculty access from their account, an entry is created in `faculty_applications` with `pending` status.
- To approve a faculty applicant or grant reviewer/admin roles:
  - An administrator can run:
    ```sql
    select public.approve_faculty_application('<target-user-uuid>', 'Verified by Academic Council');
    ```
  - Or update the role directly in the Supabase Table Editor:
    ```sql
    update public.profiles set role = 'admin' where email = 'admin@medx.vartualtutor.com';
    ```
- All client-side attempts to forge `x-medx-role`, change `localStorage`, or invoke protected endpoints are denied by database RLS and verified session tokens.

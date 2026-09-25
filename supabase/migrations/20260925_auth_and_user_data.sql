-- ==============================================================================
-- MEDX MBBS Bangladesh Platform - Supabase PostgreSQL Schema & Security Policies
-- Migration: 20260925_auth_and_user_data.sql
-- ==============================================================================

-- 1. PROFILES TABLE
-- Linked 1-to-1 with auth.users.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  institution text not null default 'Not Specified',
  mbbs_phase text not null default 'Phase 1: 1st & 2nd Year (Pre-clinical)',
  role text not null default 'student' check (role in ('student', 'faculty', 'reviewer', 'admin')),
  faculty_status text not null default 'none' check (faculty_status in ('none', 'pending', 'approved', 'rejected')),
  faculty_request_reason text,
  bmdc_reg_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Helper security-definer function to retrieve caller's verified role without recursive RLS
create or replace function public.get_my_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Profiles Policies
create policy "Allow users to read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Allow admins and reviewers to read all profiles"
  on public.profiles for select
  using (public.get_my_role() in ('admin', 'reviewer'));

create policy "Allow users to update non-privileged fields of their profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- Regular users cannot self-escalate role
    and (role = (select role from public.profiles where id = auth.uid()) or public.get_my_role() = 'admin')
  );

create policy "Allow admins to update any profile"
  on public.profiles for update
  using (public.get_my_role() = 'admin');

-- Automatic trigger to populate public.profiles upon auth.users signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  req_faculty text;
  fac_reason text;
  fac_status text;
  assigned_role text;
begin
  req_faculty := coalesce(new.raw_user_meta_data->>'request_faculty', 'false');
  fac_reason := new.raw_user_meta_data->>'faculty_request_reason';
  
  if req_faculty = 'true' then
    fac_status := 'pending';
  else
    fac_status := 'none';
  end if;

  -- Security rule: New users are always initialized as 'student'.
  -- Administrative or faculty roles must be approved by an administrator.
  assigned_role := 'student';

  insert into public.profiles (
    id,
    full_name,
    email,
    institution,
    mbbs_phase,
    role,
    faculty_status,
    faculty_request_reason,
    bmdc_reg_number
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'institution', 'Not Specified'),
    coalesce(new.raw_user_meta_data->>'mbbs_phase', 'Phase 1: 1st & 2nd Year (Pre-clinical)'),
    assigned_role,
    fac_status,
    fac_reason,
    new.raw_user_meta_data->>'bmdc_reg_number'
  );

  return new;
end;
$$;

-- Create trigger on auth.users (dropping first if already exists)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. FACULTY APPLICATIONS TABLE (Protected governance)
create table if not exists public.faculty_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  full_name text not null,
  email text not null,
  institution text not null,
  department text,
  bmdc_reg text,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id),
  review_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.faculty_applications enable row level security;

create policy "Users can view their own faculty application"
  on public.faculty_applications for select
  using (auth.uid() = user_id);

create policy "Users can submit their own faculty application"
  on public.faculty_applications for insert
  with check (auth.uid() = user_id);

create policy "Admins can view and manage all faculty applications"
  on public.faculty_applications for all
  using (public.get_my_role() = 'admin');

-- Stored procedure for admin to approve faculty application
create or replace function public.approve_faculty_application(target_user_id uuid, admin_notes text default null)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.get_my_role() <> 'admin' then
    raise exception 'Unauthorized: Only system administrators can approve faculty status.';
  end if;

  update public.profiles
  set role = 'faculty',
      faculty_status = 'approved',
      updated_at = now()
  where id = target_user_id;

  update public.faculty_applications
  set status = 'approved',
      reviewed_by = auth.uid(),
      review_notes = admin_notes,
      reviewed_at = now()
  where user_id = target_user_id;

  return true;
end;
$$;


-- 3. USER PROGRESS (Isolated to authenticated user)
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  streak_days integer not null default 0,
  overall_readiness_score integer not null default 0,
  topics_studied integer not null default 0,
  cases_completed integer not null default 0,
  ospe_stations_attempted integer not null default 0,
  accuracy_rate integer not null default 0,
  completed_lesson_ids jsonb not null default '[]'::jsonb,
  quiz_attempts_count integer not null default 0,
  weak_areas jsonb not null default '[]'::jsonb,
  spaced_repetition_due jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users can read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 4. USER BOOKMARKS
create table if not exists public.user_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  title text not null,
  subject text not null,
  phase text not null,
  last_step text not null default 'learn',
  scroll_percentage integer not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table public.user_bookmarks enable row level security;

create policy "Users can read own bookmarks"
  on public.user_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.user_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.user_bookmarks for delete
  using (auth.uid() = user_id);


-- 5. USER NOTES
create table if not exists public.user_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('drug', 'lesson', 'topic')),
  item_id text not null,
  note text not null,
  updated_at timestamptz not null default now(),
  unique(user_id, item_type, item_id)
);

alter table public.user_notes enable row level security;

create policy "Users can read own notes"
  on public.user_notes for select
  using (auth.uid() = user_id);

create policy "Users can insert own notes"
  on public.user_notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own notes"
  on public.user_notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own notes"
  on public.user_notes for delete
  using (auth.uid() = user_id);


-- 6. USER DRUG BOOKMARKS
create table if not exists public.user_drug_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('brand', 'generic')),
  item_id text not null,
  created_at timestamptz not null default now(),
  unique(user_id, item_type, item_id)
);

alter table public.user_drug_bookmarks enable row level security;

create policy "Users can read own drug bookmarks"
  on public.user_drug_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own drug bookmarks"
  on public.user_drug_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own drug bookmarks"
  on public.user_drug_bookmarks for delete
  using (auth.uid() = user_id);


-- 7. USER MISTAKES NOTEBOOK
create table if not exists public.user_mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  subject text not null,
  phase text not null,
  topic text not null,
  user_selected_answer text,
  correct_answer text,
  explanation text,
  reviewed boolean not null default false,
  review_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.user_mistakes enable row level security;

create policy "Users can read own mistakes"
  on public.user_mistakes for select
  using (auth.uid() = user_id);

create policy "Users can insert own mistakes"
  on public.user_mistakes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own mistakes"
  on public.user_mistakes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 8. USER SPACED REPETITION CARDS
create table if not exists public.user_spaced_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  lesson_id text not null,
  interval_days integer not null default 1,
  ease_factor numeric not null default 2.5,
  repetitions integer not null default 0,
  due_date timestamptz not null default now(),
  last_reviewed_date timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, card_id)
);

alter table public.user_spaced_cards enable row level security;

create policy "Users can read own spaced cards"
  on public.user_spaced_cards for select
  using (auth.uid() = user_id);

create policy "Users can manage own spaced cards"
  on public.user_spaced_cards for all
  using (auth.uid() = user_id);


-- 9. USER UPLOADS (Private study notes and medical PDFs)
create table if not exists public.user_uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_name text not null,
  file_url text not null,
  file_size integer not null default 0,
  subject text not null default 'General',
  phase text not null default 'Phase 1',
  status text not null default 'private',
  created_at timestamptz not null default now()
);

alter table public.user_uploads enable row level security;

create policy "Users can only read own private uploads"
  on public.user_uploads for select
  using (auth.uid() = user_id);

create policy "Users can insert own uploads"
  on public.user_uploads for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own uploads"
  on public.user_uploads for delete
  using (auth.uid() = user_id);


-- 10. CONTENT SUBMISSIONS (Faculty authored peer-reviewed modules)
create table if not exists public.content_submissions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  title text not null,
  type text not null check (type in ('Clinical Case', 'OSPE Station', 'Treatment Algorithm', '3D Anatomy Asset')),
  status text not null default 'Under Faculty Review' check (status in ('Draft', 'Under Faculty Review', 'Approved', 'Published')),
  reviewer_id uuid references auth.users(id),
  reviewer_name text,
  content_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.content_submissions enable row level security;

-- Public/students can only view Published modules
create policy "Anyone can view published content"
  on public.content_submissions for select
  using (status = 'Published');

-- Authors can view their own content submissions
create policy "Authors can view own submissions"
  on public.content_submissions for select
  using (auth.uid() = author_id);

-- Only verified faculty or admins can insert submissions
create policy "Faculty can author new submissions"
  on public.content_submissions for insert
  with check (
    auth.uid() = author_id
    and public.get_my_role() in ('faculty', 'reviewer', 'admin')
  );

-- Reviewers and admins can review and update all submissions
create policy "Reviewers and admins can update submissions"
  on public.content_submissions for update
  using (public.get_my_role() in ('reviewer', 'admin'));

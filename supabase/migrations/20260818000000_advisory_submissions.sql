-- Advisory intake: stores submissions from the /advisory wizard.
-- All access is server-side via the service-role key (API routes). RLS is
-- enabled with NO policies, so the anon/public client cannot read or write
-- this table directly — only the service role (which bypasses RLS) can.

create table if not exists public.advisory_submissions (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- routing / classification
  track              text,
  category           text,
  suggested_programs text[] default '{}',

  -- contact
  name               text not null,
  email              text not null,
  phone              text,
  affiliation        text,
  link               text,

  -- the intake payload
  answers            jsonb default '{}'::jsonb,
  selections         jsonb default '{}'::jsonb,
  texts              jsonb default '{}'::jsonb,
  brief              text,

  -- attached CV (path within the advisory-cvs storage bucket)
  cv_path            text,

  -- admin workflow
  status             text not null default 'new',   -- new | in_progress | replied
  admin_notes        text,
  reply_body         text,
  replied_at         timestamptz
);

create index if not exists advisory_submissions_status_idx  on public.advisory_submissions (status);
create index if not exists advisory_submissions_created_idx  on public.advisory_submissions (created_at desc);

alter table public.advisory_submissions enable row level security;
-- Intentionally no policies: locks the table to the service role only.

-- Private bucket for CV uploads (served to admins via short-lived signed URLs).
insert into storage.buckets (id, name, public)
values ('advisory-cvs', 'advisory-cvs', false)
on conflict (id) do nothing;

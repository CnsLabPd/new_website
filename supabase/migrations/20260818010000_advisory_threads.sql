-- Advisory two-way conversations: a messages table + a per-submission secure
-- thread token (for the visitor's private conversation link) + an awaiting_admin
-- flag that powers the "replies you owe" counter in the admin console.

alter table public.advisory_submissions
  add column if not exists thread_token   uuid    not null default gen_random_uuid(),
  add column if not exists awaiting_admin  boolean not null default true;

create unique index if not exists advisory_submissions_thread_token_idx
  on public.advisory_submissions (thread_token);

create table if not exists public.advisory_messages (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.advisory_submissions(id) on delete cascade,
  sender        text not null check (sender in ('admin', 'visitor')),
  body          text not null,
  created_at    timestamptz not null default now()
);

create index if not exists advisory_messages_submission_idx
  on public.advisory_messages (submission_id, created_at);

alter table public.advisory_messages enable row level security;
-- No policies: server (service-role) access only, same as advisory_submissions.

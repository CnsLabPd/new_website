-- Sonic Pop analytics tables

create table if not exists public.sonic_pop_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create table if not exists public.sonic_pop_level_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sonic_pop_sessions(id) on delete cascade,
  user_id uuid,
  level_number integer not null,
  module_number integer,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  duration_ms integer,
  score integer,
  completed boolean,
  balloons_popped integer,
  bombs_shown integer,
  bombs_hit integer,
  bombs_avoided integer,
  risk_avoidance_rate numeric,
  elbow_angle_mean numeric,
  elbow_angle_var numeric,
  elbow_angle_std numeric,
  elbow_angle_min numeric,
  elbow_angle_max numeric,
  accel_mean numeric,
  accel_var numeric,
  accel_std numeric,
  jerk_mean numeric,
  jerk_var numeric,
  jerk_std numeric,
  attention_pct numeric,
  handedness text,
  created_at timestamptz not null default now()
);

alter table public.sonic_pop_sessions enable row level security;
alter table public.sonic_pop_level_attempts enable row level security;

create policy "sonic_pop_sessions_insert" on public.sonic_pop_sessions
  for insert with check (true);

create policy "sonic_pop_sessions_update" on public.sonic_pop_sessions
  for update using (true) with check (true);

create policy "sonic_pop_level_attempts_insert" on public.sonic_pop_level_attempts
  for insert with check (true);

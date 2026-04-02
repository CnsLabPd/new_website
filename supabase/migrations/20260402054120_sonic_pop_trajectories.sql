-- Sonic Pop trajectory storage references

create table if not exists public.sonic_pop_trajectories (
  id uuid primary key default gen_random_uuid(),
  level_attempt_id uuid references public.sonic_pop_level_attempts(id) on delete cascade,
  user_id uuid,
  file_path text not null,
  sample_rate_hz integer not null,
  sample_count integer not null,
  coord_space text not null,
  canvas_width integer,
  canvas_height integer,
  created_at timestamptz not null default now()
);

alter table public.sonic_pop_trajectories enable row level security;

create policy "sonic_pop_trajectories_insert" on public.sonic_pop_trajectories
  for insert with check (auth.uid() = user_id);

create policy "sonic_pop_trajectories_select" on public.sonic_pop_trajectories
  for select using (auth.uid() = user_id);

-- Storage policies for private trajectory bucket
-- Requires bucket_id = 'sonic-pop-trajectories'
create policy "sonic_pop_trajectory_upload" on storage.objects
  for insert with check (
    bucket_id = 'sonic-pop-trajectories'
    and auth.role() = 'authenticated'
  );

create policy "sonic_pop_trajectory_read" on storage.objects
  for select using (
    bucket_id = 'sonic-pop-trajectories'
    and auth.uid() = owner
  );

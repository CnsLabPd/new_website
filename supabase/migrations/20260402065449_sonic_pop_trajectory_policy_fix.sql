-- Fix storage policy for trajectory uploads (require owner = auth.uid())

drop policy if exists "sonic_pop_trajectory_upload" on storage.objects;

drop policy if exists "sonic_pop_trajectory_read" on storage.objects;

create policy "sonic_pop_trajectory_upload" on storage.objects
  for insert with check (
    bucket_id = 'sonic-pop-trajectories'
    and auth.uid() = owner
  );

create policy "sonic_pop_trajectory_read" on storage.objects
  for select using (
    bucket_id = 'sonic-pop-trajectories'
    and auth.uid() = owner
  );

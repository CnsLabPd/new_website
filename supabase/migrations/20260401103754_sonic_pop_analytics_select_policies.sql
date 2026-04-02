-- Allow reading Sonic Pop analytics for now (client-side analytics view)

create policy "sonic_pop_sessions_select" on public.sonic_pop_sessions
  for select using (true);

create policy "sonic_pop_level_attempts_select" on public.sonic_pop_level_attempts
  for select using (true);

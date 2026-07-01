-- Run this once in the Supabase SQL editor for your project.

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  user_key text not null check (user_key in ('lasya', 'vinay', 'bhagwan', 'prasad')),
  day date not null,
  ate_out boolean not null,
  created_at timestamptz not null default now(),
  unique (user_key, day)
);

alter table checkins enable row level security;

-- No auth/login for this app: the anon key can read and write freely.
-- Anyone with the URL + anon key can see/edit check-ins, which is fine for a
-- private link shared only between the four of you, but don't post the link publicly.
create policy "anon can read checkins" on checkins
  for select using (true);

create policy "anon can insert checkins" on checkins
  for insert with check (true);

create policy "anon can update checkins" on checkins
  for update using (true);

-- Enables live sync between devices.
alter publication supabase_realtime add table checkins;

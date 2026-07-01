-- Run this once in the Supabase SQL editor to allow the 2 new users.
-- (Only needed on databases created before bhagwan/prasad were added;
-- a fresh setup from supabase/schema.sql already includes them.)

alter table checkins drop constraint if exists checkins_user_key_check;
alter table checkins add constraint checkins_user_key_check
  check (user_key in ('me', 'vinay', 'bhagwan', 'prasad'));

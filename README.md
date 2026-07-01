# No Eating Out

A tiny 2-person tracker: each day, you and Vinay mark whether you ate out or not.
Every 7 consecutive clean days earns a dark chocolate 🍫. Tracked independently
per person over a 30-day challenge.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a [Supabase](https://supabase.com) project, then run `supabase/schema.sql`
   in the Supabase SQL editor to create the `checkins` table and policies.

3. Copy `.env.local.example` to `.env.local` and fill in your project's URL and
   anon/publishable key (Supabase project settings → API):

   ```
   cp .env.local.example .env.local
   ```

4. Run the dev server:

   ```
   npm run dev
   ```

   Open `localhost:3000`.

## Notes

- There's no login — anyone with the deployed URL and anon key can read/write
  check-ins, so only share the link between the two of you.
- Data syncs live between devices via Supabase Realtime.
- Styling uses Tailwind with the `indigo`/`zinc` palette.
# 30days git init git add . git commit -m first commit git branch -M main git remote add origin https://github.com/psktmt-development/30days.git git push -u origin main

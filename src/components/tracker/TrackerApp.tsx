import { getUserProgress } from "@/lib/progress";
import { useCheckins } from "@/lib/useCheckins";
import { UserKey } from "@/lib/types";
import { Header } from "../nav/Header";
import { UserPanel } from "./UserPanel";

const USERS: { key: UserKey; label: string }[] = [
  { key: "me", label: "Me" },
  { key: "vinay", label: "Vinay" },
  { key: "bhagwan", label: "Bhagwan" },
  { key: "prasad", label: "Prasad" },
];

export const TrackerApp = () => {
  const { checkins, loading, error, markToday } = useCheckins();

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-5xl space-y-12 px-4 py-12 md:px-8">
        <div>
          <h1 className="text-4xl font-black text-zinc-100 sm:text-6xl">
            No Eating Out<span className="text-indigo-500">.</span>
          </h1>
          <p className="mt-2 max-w-xl text-zinc-400">
            30 days, four of us, zero excuses. Every 7 clean days in a row earns a dark
            chocolate 🍫.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-rose-800 bg-rose-950/40 p-4 text-sm text-rose-300">
            Couldn&apos;t reach Supabase: {error}. Make sure you&apos;ve run{" "}
            <code>supabase/schema.sql</code> in your Supabase project and set the URL/anon
            key in <code>.env.local</code>.
          </div>
        )}

        {loading ? (
          <p className="text-zinc-400">Loading...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {USERS.map((user) => (
              <UserPanel
                key={user.key}
                label={user.label}
                progress={getUserProgress(checkins, user.key)}
                onMark={(ateOut) => markToday(user.key, ateOut)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

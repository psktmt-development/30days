import { useState } from "react";
import { getUserProgress } from "@/lib/progress";
import { useCheckins } from "@/lib/useCheckins";
import { PROFILES } from "@/lib/profiles";
import { UserKey } from "@/lib/types";
import { Header } from "../nav/Header";
import { UserPanel } from "./UserPanel";
import { IntroScreen } from "./IntroScreen";
import { ProfileSelect } from "./ProfileSelect";
import { ReactionPopup } from "./ReactionPopup";

type View = "intro" | "select" | "tracker";

interface Props {
  yesImages: string[];
  noImages: string[];
}

export const TrackerApp = ({ yesImages, noImages }: Props) => {
  const { checkins, loading, error, markToday } = useCheckins();
  const [view, setView] = useState<View>("intro");
  const [activeUser, setActiveUser] = useState<UserKey | null>(null);
  const [reaction, setReaction] = useState<"clean" | "ate_out" | null>(null);

  const profile = PROFILES.find((p) => p.key === activeUser);

  const handleMark = async (ateOut: boolean) => {
    if (!activeUser) return;
    await markToday(activeUser, ateOut);
    setReaction(ateOut ? "ate_out" : "clean");
  };

  const switchProfile = () => {
    setActiveUser(null);
    setView("select");
  };

  return (
    <div>
      {view === "intro" && <IntroScreen onContinue={() => setView("select")} />}

      {view === "select" && (
        <ProfileSelect
          profiles={PROFILES}
          onSelect={(key) => {
            setActiveUser(key);
            setView("tracker");
          }}
        />
      )}

      {view === "tracker" && activeUser && profile && (
        <>
          <Header />
          <main className="mx-auto max-w-2xl space-y-8 px-4 py-12 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-zinc-100 sm:text-5xl">
                  Yo, {profile.label}
                  <span className="text-indigo-500">.</span>
                </h1>
                <p className="mt-2 text-zinc-400">
                  Did you eat out today? Don&apos;t lie to the chocolate gods.
                </p>
              </div>
              <button
                className="shrink-0 text-sm text-zinc-500 underline hover:text-zinc-300"
                onClick={switchProfile}
              >
                Switch profile
              </button>
            </div>

            {error && (
              <div className="rounded-lg border border-rose-800 bg-rose-950/40 p-4 text-sm text-rose-300">
                Couldn&apos;t reach Supabase: {error}. Make sure you&apos;ve run the
                migrations in <code>supabase/migrations</code> and set the URL/anon key in{" "}
                <code>.env.local</code>.
              </div>
            )}

            {loading ? (
              <p className="text-zinc-400">Loading...</p>
            ) : (
              <UserPanel
                label={profile.label}
                progress={getUserProgress(checkins, activeUser)}
                onMark={handleMark}
              />
            )}
          </main>
        </>
      )}

      {reaction && (
        <ReactionPopup
          kind={reaction}
          images={reaction === "clean" ? yesImages : noImages}
          onClose={() => setReaction(null)}
        />
      )}
    </div>
  );
};

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Checkin, UserKey } from "./types";

export const useCheckins = () => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase
      .from("checkins")
      .select("*")
      .order("day", { ascending: true });
    if (error) {
      setError(error.message);
    } else if (data) {
      setError(null);
      setCheckins(data as Checkin[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel("checkins-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkins" },
        () => fetchAll()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAll]);

  const markToday = useCallback(async (userKey: UserKey, ateOut: boolean) => {
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase
      .from("checkins")
      .upsert(
        { user_key: userKey, day: today, ate_out: ateOut },
        { onConflict: "user_key,day" }
      );
    if (error) setError(error.message);
  }, []);

  return { checkins, loading, error, markToday };
};

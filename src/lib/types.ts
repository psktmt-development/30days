export type UserKey = "lasya" | "vinay" | "bhagwan" | "prasad";

export interface Checkin {
  id: string;
  user_key: UserKey;
  day: string; // YYYY-MM-DD
  ate_out: boolean;
  created_at: string;
}

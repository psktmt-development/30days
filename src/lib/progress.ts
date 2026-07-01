import { Checkin, UserKey } from "./types";

const CHALLENGE_LENGTH = 30;
const CHOCOLATE_INTERVAL = 7;

export type DayStatus = "clean" | "ate_out" | "missed" | "future";

export interface DayCell {
  date: string;
  offset: number;
  status: DayStatus;
}

export interface UserProgress {
  startDate: string | null;
  daysElapsed: number;
  isComplete: boolean;
  cells: DayCell[];
  currentStreak: number;
  chocolates: number;
  todayStatus: "clean" | "ate_out" | "unmarked";
}

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return toISODate(d);
};

const diffDays = (a: string, b: string) => {
  const da = new Date(`${a}T00:00:00Z`).getTime();
  const db = new Date(`${b}T00:00:00Z`).getTime();
  return Math.round((db - da) / 86400000);
};

const EMPTY_PROGRESS: UserProgress = {
  startDate: null,
  daysElapsed: 0,
  isComplete: false,
  cells: [],
  currentStreak: 0,
  chocolates: 0,
  todayStatus: "unmarked",
};

export const getUserProgress = (
  checkins: Checkin[],
  userKey: UserKey
): UserProgress => {
  const userCheckins = checkins.filter((c) => c.user_key === userKey);
  if (userCheckins.length === 0) return EMPTY_PROGRESS;

  const today = toISODate(new Date());
  const byDay = new Map(userCheckins.map((c) => [c.day, c]));
  const startDate = userCheckins.reduce(
    (min, c) => (c.day < min ? c.day : min),
    userCheckins[0].day
  );

  const cells: DayCell[] = [];
  let runningStreak = 0;
  let chocolates = 0;

  for (let offset = 0; offset < CHALLENGE_LENGTH; offset++) {
    const date = addDays(startDate, offset);
    let status: DayStatus;

    if (date > today) {
      status = "future";
    } else {
      const entry = byDay.get(date);
      status = !entry ? "missed" : entry.ate_out ? "ate_out" : "clean";
    }

    if (status === "clean") {
      runningStreak++;
      if (runningStreak % CHOCOLATE_INTERVAL === 0) chocolates++;
    } else if (status === "ate_out" || status === "missed") {
      runningStreak = 0;
    }

    cells.push({ date, offset, status });
  }

  let currentStreak = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    const status = cells[i].status;
    if (status === "future") continue;
    if (status !== "clean") break;
    currentStreak++;
  }

  const daysElapsed = Math.min(CHALLENGE_LENGTH, diffDays(startDate, today) + 1);
  const isComplete = daysElapsed >= CHALLENGE_LENGTH;

  const todayEntry = byDay.get(today);
  const todayStatus = !todayEntry
    ? "unmarked"
    : todayEntry.ate_out
    ? "ate_out"
    : "clean";

  return {
    startDate,
    daysElapsed,
    isComplete,
    cells,
    currentStreak,
    chocolates,
    todayStatus,
  };
};

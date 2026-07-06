import { DayCell, UserProgress } from "@/lib/progress";
import { OutlineButton } from "../buttons/OutlineButton";
import { Chip } from "../util/Chip";
import { Calendar } from "./Calendar";

interface Props {
  label: string;
  progress: UserProgress;
  onMark: (ateOut: boolean) => void;
  onSelectDay?: (cell: DayCell) => void;
}

export const UserPanel = ({ label, progress, onMark, onSelectDay }: Props) => {
  const { startDate, daysElapsed, isComplete, cells, currentStreak, chocolates, todayStatus } =
    progress;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-2xl font-bold text-zinc-100">{label}</h3>
        <div className="flex flex-wrap justify-end gap-2">
          <Chip>{startDate ? `Day ${daysElapsed}/30` : "Not started"}</Chip>
          <Chip>{chocolates > 0 ? "🍫".repeat(chocolates) : "0 🍫"}</Chip>
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-4">
        Current streak:{" "}
        <span className="font-semibold text-indigo-400">
          {currentStreak} day{currentStreak === 1 ? "" : "s"}
        </span>
      </p>

      {todayStatus === "unmarked" ? (
        <div className="flex flex-wrap gap-3 mb-6">
          <OutlineButton
            className="border-emerald-600 text-emerald-400 before:bg-emerald-600 hover:border-emerald-600 hover:text-white"
            onClick={() => onMark(false)}
          >
            Didn&apos;t eat out today
          </OutlineButton>
          <OutlineButton
            className="border-rose-600 text-rose-400 before:bg-rose-600 hover:border-rose-600 hover:text-white"
            onClick={() => onMark(true)}
          >
            Ate out today
          </OutlineButton>
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-6">
          <Chip>{todayStatus === "clean" ? "Today: clean ✅" : "Today: ate out ❌"}</Chip>
          <button
            className="text-xs text-zinc-500 underline hover:text-zinc-300"
            onClick={() => onMark(todayStatus !== "clean")}
          >
            change
          </button>
        </div>
      )}

      {cells.length > 0 && (
        <>
          <Calendar cells={cells} onSelect={onSelectDay} />
          {onSelectDay && (
            <p className="mt-2 text-xs text-zinc-500">
              Missed a day or made a mistake? Click any past day to set or fix it.
            </p>
          )}
        </>
      )}

      {isComplete && (
        <p className="mt-4 text-sm font-semibold text-indigo-400">30 days complete! 🎉</p>
      )}
    </div>
  );
};

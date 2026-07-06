import { twMerge } from "tailwind-merge";
import { DayCell } from "@/lib/progress";

const STYLES: Record<DayCell["status"], string> = {
  clean: "bg-emerald-600 text-white",
  ate_out: "bg-rose-600 text-white",
  missed: "bg-zinc-700 text-zinc-300",
  future: "bg-zinc-800/50 text-zinc-600",
};

interface Props {
  cells: DayCell[];
  onSelect?: (cell: DayCell) => void;
}

export const Calendar = ({ cells, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {cells.map((cell) => {
        const clickable = onSelect && cell.status !== "future";
        return (
          <button
            key={cell.date}
            type="button"
            disabled={!clickable}
            onClick={() => clickable && onSelect(cell)}
            title={`${cell.date}: ${cell.status.replace("_", " ")}${
              clickable ? " (click to edit)" : ""
            }`}
            className={twMerge(
              "aspect-square rounded flex items-center justify-center text-[10px] font-medium",
              STYLES[cell.status],
              clickable && "cursor-pointer transition-transform hover:scale-110 hover:ring-2 hover:ring-white/60"
            )}
          >
            {cell.offset + 1}
          </button>
        );
      })}
    </div>
  );
};

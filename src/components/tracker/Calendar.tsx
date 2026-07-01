import { twMerge } from "tailwind-merge";
import { DayCell } from "@/lib/progress";

const STYLES: Record<DayCell["status"], string> = {
  clean: "bg-emerald-600 text-white",
  ate_out: "bg-rose-600 text-white",
  missed: "bg-zinc-700 text-zinc-300",
  future: "bg-zinc-800/50 text-zinc-600",
};

export const Calendar = ({ cells }: { cells: DayCell[] }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {cells.map((cell) => (
        <div
          key={cell.date}
          title={`${cell.date}: ${cell.status.replace("_", " ")}`}
          className={twMerge(
            "aspect-square rounded flex items-center justify-center text-[10px] font-medium",
            STYLES[cell.status]
          )}
        >
          {cell.offset + 1}
        </div>
      ))}
    </div>
  );
};

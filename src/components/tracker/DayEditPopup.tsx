import { DayCell } from "@/lib/progress";
import { OutlineButton } from "../buttons/OutlineButton";

interface Props {
  cell: DayCell;
  onPick: (ateOut: boolean) => void;
  onClose: () => void;
}

export const DayEditPopup = ({ cell, onPick, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-xs flex-col items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center animate-[fadeInScale_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-zinc-400">Editing</p>
        <p className="text-lg font-bold text-zinc-100">{cell.date}</p>
        <div className="flex w-full flex-col gap-3">
          <OutlineButton
            className="w-full justify-center border-emerald-600 text-emerald-400 before:bg-emerald-600 hover:border-emerald-600 hover:text-white"
            onClick={() => onPick(false)}
          >
            Didn&apos;t eat out
          </OutlineButton>
          <OutlineButton
            className="w-full justify-center border-rose-600 text-rose-400 before:bg-rose-600 hover:border-rose-600 hover:text-white"
            onClick={() => onPick(true)}
          >
            Ate out
          </OutlineButton>
        </div>
        <button
          className="text-sm text-zinc-500 underline hover:text-zinc-300"
          onClick={onClose}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

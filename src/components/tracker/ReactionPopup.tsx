import Image from "next/image";
import { useEffect, useState } from "react";

const SLAY_LINES = [
  "SLAYING bestie 💅 certified home-cooked icon",
  "no thoughts, just discipline. we stan 🔥",
  "main character energy, zero regrets ✨",
  "ate (at home) and left no crumbs 💯",
  "understood the assignment 📝✅",
  "it's giving self control fr fr",
];

const NUHUH_LINES = [
  "nuhuh 🙅 not very demure, not very mindful",
  "bestie... we LITERALLY said no 😭",
  "not the takeout again 💀",
  "this ain't it chief",
  "big oof energy, try again tomorrow",
  "the streak said \"not today\" 😔",
];

interface Props {
  kind: "clean" | "ate_out";
  images: string[];
  onClose: () => void;
}

export const ReactionPopup = ({ kind, images, onClose }: Props) => {
  const [image] = useState(() =>
    images.length > 0 ? images[Math.floor(Math.random() * images.length)] : null
  );
  const [line] = useState(() => {
    const pool = kind === "clean" ? SLAY_LINES : NUHUH_LINES;
    return pool[Math.floor(Math.random() * pool.length)];
  });

  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const folder = kind === "clean" ? "yes" : "no";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-w-xs flex-col items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center animate-[fadeInScale_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {image && (
          <span className="relative block size-40 overflow-hidden rounded-lg">
            <Image
              src={`/images/${folder}/${image}`}
              alt=""
              fill
              sizes="160px"
              className="object-cover"
            />
          </span>
        )}
        <p className="text-lg font-bold text-zinc-100">{line}</p>
        <button
          className="text-sm text-zinc-500 underline hover:text-zinc-300"
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>
  );
};

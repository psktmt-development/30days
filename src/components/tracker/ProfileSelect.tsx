import Image from "next/image";
import { Profile } from "@/lib/profiles";
import { UserKey } from "@/lib/types";

interface Props {
  profiles: Profile[];
  onSelect: (key: UserKey) => void;
}

export const ProfileSelect = ({ profiles, onSelect }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 text-center">
      <h2 className="text-2xl font-bold text-zinc-100 sm:text-4xl">Who&apos;s checking in?</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {profiles.map((profile) => (
          <button
            key={profile.key}
            onClick={() => onSelect(profile.key)}
            className="group flex flex-col items-center gap-3"
          >
            <span className="relative block size-24 overflow-hidden rounded-lg ring-2 ring-transparent transition group-hover:ring-indigo-500 sm:size-32">
              <Image
                src={profile.image}
                alt={profile.label}
                fill
                sizes="128px"
                className="object-cover"
              />
            </span>
            <span className="text-zinc-400 transition group-hover:text-zinc-100">
              {profile.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

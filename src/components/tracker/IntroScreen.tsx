import { OutlineButton } from "../buttons/OutlineButton";

interface Props {
  onContinue: () => void;
}

export const IntroScreen = ({ onContinue }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="animate-[fadeInScale_0.8s_ease-out] text-5xl font-black text-zinc-100 sm:text-7xl">
        No Eating Out<span className="text-indigo-500">.</span>
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">30 days. Four of us. Zero excuses.</p>
      <OutlineButton className="mt-8" onClick={onContinue}>
        Enter
      </OutlineButton>
    </div>
  );
};

import { UserKey } from "./types";

export interface Profile {
  key: UserKey;
  label: string;
  image: string;
}

export const PROFILES: Profile[] = [
  { key: "lasya", label: "Lasya", image: "/lasya.jpg" },
  { key: "vinay", label: "Vinay", image: "/vinay.jpg" },
  { key: "bhagwan", label: "Bhagwan", image: "/bhagwan.jpg" },
  { key: "prasad", label: "Prasad", image: "/prasad.jpg" },
];

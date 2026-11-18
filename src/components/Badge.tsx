import type { ReactNode } from "react";
import type { Role, Status } from "../types";

export type Tone = "slate" | "sky" | "emerald" | "amber" | "rose" | "violet";

const TONES: Record<Tone, string> = {
  slate: "bg-slate-500/15 text-slate-300 ring-slate-400/30",
  sky: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  amber: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-400/30",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-400/30",
};

export const ROLE_TONE: Record<Role, Tone> = { admin: "violet", editor: "sky", viewer: "slate" };
export const STATUS_TONE: Record<Status, Tone> = { active: "emerald", pending: "amber", suspended: "rose" };

export default function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ${TONES[tone]}`}>{children}</span>;
}

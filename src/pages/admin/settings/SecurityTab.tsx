import { useState } from "react";
import ToggleRow from "../../../components/ToggleRow";

export default function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSaved(true); };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <ToggleRow label="Two-factor authentication" hint="Require a code at sign-in" checked={twoFactor} onChange={(v) => { setTwoFactor(v); setSaved(false); }} />
      <ToggleRow label="New sign-in alerts" hint="Email me when a new device signs in" checked={alerts} onChange={(v) => { setAlerts(v); setSaved(false); }} />
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" className="focus-ring rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">Save security</button>
        {saved && <span role="status" className="text-sm text-emerald-300">Saved (demo only)</span>}
      </div>
    </form>
  );
}

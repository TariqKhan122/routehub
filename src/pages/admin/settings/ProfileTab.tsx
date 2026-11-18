import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function ProfileTab() {
  const { user } = useAuth();
  const [name, setName] = useState<string>(user?.name ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSaved(true); };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm text-slate-400">Full name
        <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setSaved(false); }} className="field mt-1" />
      </label>
      <label className="block text-sm text-slate-400">Email
        <input value={email} type="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setSaved(false); }} className="field mt-1" />
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={!name.trim() || !email.trim()}
          className="focus-ring rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40">Save profile</button>
        {saved && <span role="status" className="text-sm text-emerald-300">Saved (demo only, not persisted)</span>}
      </div>
    </form>
  );
}

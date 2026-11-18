import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USERS } from "../../data/users";
import { formatCurrency, formatDate } from "../../utils/format";

// Router state is `unknown`: narrow it before use.
const readFlash = (state: unknown): string | null =>
  typeof state === "object" && state !== null && "flash" in state && typeof state.flash === "string" ? state.flash : null;

export default function Overview() {
  const location = useLocation();
  const navigate = useNavigate();
  // Capture the message once (lazy init), then clear it from history so a reload doesn't repeat it.
  const [flash, setFlash] = useState<string | null>(() => readFlash(location.state));

  useEffect(() => {
    if (readFlash(location.state) !== null) navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  const count = (pred: (u: (typeof USERS)[number]) => boolean) => USERS.filter(pred).length;
  const revenue = USERS.reduce((sum, u) => sum + u.spend, 0);
  const recent = [...USERS].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 5); // copy before sort

  // Every KPI links to a pre-filtered view: the filters live in the query string.
  const kpis = [
    { label: "Total users", value: USERS.length, to: "/admin/users" },
    { label: "Active", value: count((u) => u.status === "active"), to: "/admin/users?status=active" },
    { label: "Pending invites", value: count((u) => u.status === "pending"), to: "/admin/users?status=pending" },
    { label: "Admins", value: count((u) => u.role === "admin"), to: "/admin/users?role=admin" },
  ];

  return (
    <div className="space-y-6">
      {flash !== null && (
        <div role="status" className="flex items-center justify-between rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
          {flash}
          <button onClick={() => setFlash(null)} className="focus-ring rounded px-2 hover:bg-emerald-500/20" aria-label="Dismiss">✕</button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Link key={k.label} to={k.to} className="focus-ring rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-sky-400/60">
            <p className="text-sm text-slate-400">{k.label}</p>
            <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">{k.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 lg:col-span-2">
          <h2 className="font-semibold">Newest members</h2>
          <ul className="mt-3 divide-y divide-slate-800">
            {recent.map((u) => (
              <li key={u.id} className="flex items-center justify-between py-2.5 text-sm">
                <Link to={`/admin/users/${u.id}`} className="focus-ring rounded font-medium hover:text-sky-300">{u.name}</Link>
                <span className="text-slate-500">{formatDate(u.joined)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="font-semibold">Lifetime revenue</h2>
          <p className="mt-2 font-display text-3xl font-extrabold tabular-nums">{formatCurrency(revenue)}</p>
          <Link to="/admin/settings" className="focus-ring mt-4 inline-block rounded text-sm text-sky-300 hover:underline">Open settings</Link>
        </section>
      </div>
    </div>
  );
}

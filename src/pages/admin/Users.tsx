import { Link, useSearchParams } from "react-router-dom";
import Badge, { ROLE_TONE, STATUS_TONE } from "../../components/Badge";
import { ROLES, STATUSES, USERS } from "../../data/users";
import { formatCurrency, formatDate } from "../../utils/format";
import type { Role, Status } from "../../types";

export default function Users() {
  // The URL is the single source of truth for filters: shareable, bookmarkable, reload-safe.
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const roleParam = searchParams.get("role");
  const statusParam = searchParams.get("status");

  // Never trust the query string: only accept values that are real roles/statuses.
  const role: Role | "" = ROLES.find((r) => r === roleParam) ?? "";
  const status: Status | "" = STATUSES.find((s) => s === statusParam) ?? "";

  // ---- Derived: no filter state, the list is computed from the URL on every render ----
  const query = q.trim().toLowerCase();
  const rows = USERS.filter((u) =>
    (role === "" || u.role === role) &&
    (status === "" || u.status === status) &&
    (query === "" || `${u.name} ${u.email}`.toLowerCase().includes(query))
  );
  const hasFilters = q !== "" || role !== "" || status !== "";

  // Functional update: copy the CURRENT params, change one key. Other filters are preserved.
  // `replace` for typing keeps Back from replaying every keystroke.
  const update = (key: "q" | "role" | "status", value: string) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: key === "q" });

  const clearFilters = () => setSearchParams({});

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("q", e.target.value)}
          placeholder="Search name or email…" aria-label="Search users" className="field min-w-48 flex-1" />
        <select value={role} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update("role", e.target.value)}
          aria-label="Filter by role" className="field w-auto capitalize">
          <option value="">All roles</option>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update("status", e.target.value)}
          aria-label="Filter by status" className="field w-auto capitalize">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {hasFilters && (
          <button onClick={clearFilters} className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-sky-300 hover:bg-sky-500/10">Clear filters</button>
        )}
      </div>

      <p className="text-sm text-slate-500" aria-live="polite">{rows.length} of {USERS.length} users</p>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 px-6 py-14 text-center">
          <p className="font-display text-xl font-semibold">No users match these filters</p>
          <p className="mt-1 text-sm text-slate-400">Try a different search, or reset the filters.</p>
          <button onClick={clearFilters} className="focus-ring mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">Clear filters</button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">User</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 text-right font-medium">Orders</th>
                <th className="px-4 py-2.5 text-right font-medium">Spend</th>
                <th className="px-4 py-2.5 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((u) => (
                <tr key={u.id} className="transition hover:bg-slate-900/70">
                  <td className="px-4 py-2.5">
                    {/* Link (not NavLink): an inline content link, no "active" concept */}
                    <Link to={`/admin/users/${u.id}`} className="focus-ring rounded font-medium hover:text-sky-300">{u.name}</Link>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="px-4 py-2.5"><Badge tone={ROLE_TONE[u.role]}>{u.role}</Badge></td>
                  <td className="px-4 py-2.5"><Badge tone={STATUS_TONE[u.status]}>{u.status}</Badge></td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{u.orders}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{formatCurrency(u.spend)}</td>
                  <td className="px-4 py-2.5 text-slate-400">{formatDate(u.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

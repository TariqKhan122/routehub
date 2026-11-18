import { useParams } from "react-router-dom";
import Badge, { ROLE_TONE, STATUS_TONE } from "../../components/Badge";
import NotFoundState from "../../components/NotFoundState";
import { findUser } from "../../data/users";
import { useGoBack } from "../../hooks/useGoBack";
import { formatCurrency, formatDate, initials } from "../../utils/format";

export default function UserDetail() {
  // Route params are `string | undefined`: guard before looking anything up.
  const { userId } = useParams<{ userId: string }>();
  const goBack = useGoBack("/admin/users"); // navigate(-1) keeps the list's ?filters intact
  const user = userId ? findUser(userId) : undefined;

  if (!user) {
    return <NotFoundState title="User not found" message={`There is no user with the ID "${userId ?? ""}".`} to="/admin/users" label="Back to all users" />;
  }

  const stats = [
    { label: "Orders", value: String(user.orders) },
    { label: "Lifetime spend", value: formatCurrency(user.spend) },
    { label: "Joined", value: formatDate(user.joined) },
    { label: "Last active", value: formatDate(user.lastActive) },
  ];

  return (
    <div className="space-y-5">
      <button onClick={goBack} className="focus-ring rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-800">← Back</button>

      <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid size-14 shrink-0 place-items-center rounded-full bg-sky-500/20 font-display text-xl font-extrabold text-sky-300">{initials(user.name)}</div>
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold">{user.name}</p>
          <p className="truncate text-sm text-slate-400">{user.email}</p>
          <div className="mt-2 flex gap-2"><Badge tone={ROLE_TONE[user.role]}>{user.role}</Badge><Badge tone={STATUS_TONE[user.status]}>{user.status}</Badge></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">{s.label}</p>
            <p className="mt-1 font-semibold tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="font-semibold">Recent activity</h2>
        <ul className="mt-3 divide-y divide-slate-800 text-sm">
          {user.activity.map((a) => (
            <li key={a.id} className="flex justify-between py-2.5"><span>{a.text}</span><span className="text-slate-500">{formatDate(a.date)}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
}

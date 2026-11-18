import { NavLink, Outlet } from "react-router-dom";

const TABS = [
  { to: "profile", label: "Profile" },
  { to: "security", label: "Security" },
  { to: "notifications", label: "Notifications" },
];

// Third nesting level: App → AdminLayout → SettingsLayout → a tab page.
export default function SettingsLayout() {
  return (
    <div>
      <nav role="tablist" aria-label="Settings sections" className="flex gap-1 border-b border-slate-800">
        {TABS.map((t) => (
          // `to="profile"` is RELATIVE: it resolves against this route (/admin/settings),
          // so the links keep working even if the parent path ever changes.
          <NavLink key={t.to} to={t.to} role="tab"
            className={({ isActive }) => `focus-ring -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              isActive ? "border-sky-400 text-sky-300" : "border-transparent text-slate-400 hover:text-slate-100"
            }`}>
            {t.label}
          </NavLink>
        ))}
      </nav>
      <div className="max-w-xl pt-6"><Outlet /></div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { findUser } from "../data/users";

interface Crumb { label: string; to: string }

const NAV = [
  { to: "/admin", label: "Overview", end: true, icon: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { to: "/admin/users", label: "Users", end: false, icon: "M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21a8 8 0 0116 0" },
  { to: "/admin/settings", label: "Settings", end: false, icon: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M2 12h3M19 12h3" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-current stroke-2" aria-hidden>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Breadcrumbs are derived from the URL itself; no extra state to keep in sync.
function buildCrumbs(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean).slice(1); // drop "admin"
  const crumbs: Crumb[] = [{ label: "Admin", to: "/admin" }];
  let path = "/admin";
  parts.forEach((seg, i) => {
    path += `/${seg}`;
    const label = parts[i - 1] === "users"
      ? findUser(seg)?.name ?? "Unknown user"
      : seg.charAt(0).toUpperCase() + seg.slice(1);
    crumbs.push({ label, to: path });
  });
  return crumbs;
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Admin">
      {NAV.map((item) => (
        // NavLink hands its className an `isActive` flag. `end` stops "/admin" from matching
        // every child; "Users" stays active on /admin/users/u101 because it has no `end`.
        <NavLink key={item.to} to={item.to} end={item.end} title={item.label}
          className={({ isActive }) => `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive ? "bg-sky-500/15 text-sky-300" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}>
          <Icon d={item.icon} />
          {!collapsed && <span>{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const crumbs = buildCrumbs(location.pathname);
  const current = crumbs[crumbs.length - 1];
  const title = crumbs.length === 1 ? "Overview" : current.label;

  // Close the mobile drawer whenever the route changes (tapping a link navigates, then this runs).
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    // Navigate first: once `user` is null, ProtectedRoute would otherwise redirect with a stale `from`.
    navigate("/login", { replace: true });
    logout();
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <aside className={`hidden shrink-0 border-r border-slate-800 bg-slate-900/60 transition-all md:block ${collapsed ? "w-16" : "w-60"}`}>
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
          {!collapsed && <Link to="/" className="focus-ring font-display text-lg font-extrabold">RouteHub</Link>}
          <button onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="focus-ring rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100">
            <Icon d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
          </button>
        </div>
        <SidebarNav collapsed={collapsed} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/60" />
          <aside className="relative h-full w-64 border-r border-slate-800 bg-slate-900">
            <div className="flex h-14 items-center border-b border-slate-800 px-4 font-display text-lg font-extrabold">RouteHub</div>
            <SidebarNav collapsed={false} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-slate-800 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} aria-label="Open menu"
              className="focus-ring rounded-md p-1 text-slate-400 hover:bg-slate-800 md:hidden"><Icon d="M4 6h16M4 12h16M4 18h16" /></button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 truncate text-sm text-slate-500">
              {crumbs.map((c, i) => (
                <span key={c.to} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {/* Link for inline navigation; the last crumb is plain text (the current page) */}
                  {i < crumbs.length - 1
                    ? <Link to={c.to} className="focus-ring rounded hover:text-slate-200">{c.label}</Link>
                    : <span aria-current="page" className="text-slate-200">{c.label}</span>}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-sm">
            <Link to="/blog" className="focus-ring hidden rounded text-slate-400 hover:text-slate-100 sm:inline">Blog</Link>
            <span className="hidden text-slate-500 sm:inline">{user?.name}</span>
            <button onClick={handleLogout} className="focus-ring rounded-lg border border-slate-700 px-3 py-1.5 font-medium hover:bg-slate-800">Log out</button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <h1 className="mb-5 font-display text-2xl font-extrabold tracking-tight">{title}</h1>
          {/* Child routes render here; the sidebar and header above stay mounted */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

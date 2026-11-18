import { Link, NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { to: "/blog", label: "All Posts", end: true },
  { to: "/blog/categories", label: "Categories", end: false },
  { to: "/blog/about", label: "About", end: false },
];

export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-white font-serif text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
          <Link to="/blog" className="focus-ring rounded text-2xl font-bold tracking-tight">Fieldnotes</Link>
          <nav aria-label="Blog" className="flex items-center gap-5 font-sans text-sm">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => `focus-ring rounded py-1 transition ${
                  isActive ? "border-b-2 border-slate-900 font-semibold" : "border-b-2 border-transparent text-slate-500 hover:text-slate-900"
                }`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/admin" className="focus-ring rounded text-blue-700 hover:underline">Admin dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10"><Outlet /></main>
      <footer className="border-t border-slate-200 py-6 text-center font-sans text-sm text-slate-500">
        <Link to="/" className="focus-ring rounded hover:text-slate-900">RouteHub home</Link>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-14">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">RouteHub</h1>
      <p className="mt-3 max-w-xl text-slate-400">Two multi-page apps in one router. Pick a module to start.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin" className="focus-ring group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-400/60">
          <p className="font-display text-2xl font-semibold">Admin dashboard</p>
          <p className="mt-2 text-sm text-slate-400">Protected area with users, filters and settings. Sign-in required; a demo login is provided.</p>
        </Link>
        <Link to="/blog" className="focus-ring group rounded-2xl border border-slate-800 bg-white p-6 text-slate-900 transition hover:border-sky-400">
          <p className="font-serif text-2xl font-semibold">Blog reader</p>
          <p className="mt-2 text-sm text-slate-600">Public editorial site with categories, search and a reading view.</p>
        </Link>
      </div>

      <Link to="/this-page-does-not-exist" className="focus-ring mt-8 w-fit rounded text-sm text-slate-500 underline hover:text-slate-300">
        Try a broken link to see the 404 page
      </Link>
    </main>
  );
}

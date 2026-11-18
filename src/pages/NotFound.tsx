import { Link, useLocation } from "react-router-dom";
import { useGoBack } from "../hooks/useGoBack";

export default function NotFound() {
  // useLocation tells us which URL failed to match, so we can show it back to the user.
  const location = useLocation();
  const goBack = useGoBack("/");
  const link = "focus-ring rounded-lg px-4 py-2 text-sm font-semibold";

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-extrabold text-sky-400">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-3 text-slate-400">Nothing lives at</p>
      <code className="mt-1 max-w-full break-all rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-sky-300">
        {location.pathname}{location.search}
      </code>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className={`${link} bg-sky-500 text-slate-950 hover:bg-sky-400`}>Home</Link>
        <Link to="/admin" className={`${link} border border-slate-700 hover:bg-slate-800`}>Dashboard</Link>
        <Link to="/blog" className={`${link} border border-slate-700 hover:bg-slate-800`}>Blog</Link>
        <button onClick={goBack} className={`${link} text-slate-400 hover:text-slate-100`}>Go back</button>
      </div>
    </main>
  );
}

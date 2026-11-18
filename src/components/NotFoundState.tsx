import { Link } from "react-router-dom";

interface NotFoundStateProps {
  title: string;
  message: string;
  to: string;
  label: string;
  tone?: "dark" | "light";
}

// "Item not found" panel for a VALID route with an INVALID param (e.g. /admin/users/zzz).
// The global 404 page handles URLs that match no route at all.
export default function NotFoundState({ title, message, to, label, tone = "dark" }: NotFoundStateProps) {
  const light = tone === "light";
  return (
    <div className={`rounded-xl border border-dashed px-6 py-14 text-center ${light ? "border-slate-300" : "border-slate-700"}`}>
      <p className={`text-xl font-semibold ${light ? "font-serif text-slate-900" : "font-display text-slate-100"}`}>{title}</p>
      <p className={`mx-auto mt-2 max-w-sm text-sm ${light ? "text-slate-600" : "text-slate-400"}`}>{message}</p>
      <Link to={to} className={`focus-ring mt-5 inline-block rounded-lg px-4 py-2 text-sm font-semibold ${
        light ? "bg-slate-900 text-white hover:bg-slate-700" : "bg-sky-500 text-slate-950 hover:bg-sky-400"
      }`}>
        {label}
      </Link>
    </div>
  );
}

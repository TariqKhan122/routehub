import { Link } from "react-router-dom";
import { CATEGORIES, POSTS } from "../../data/posts";

export default function Categories() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const n = POSTS.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} to={`/blog/category/${c.slug}`} className="focus-ring rounded-xl border border-slate-200 p-5 transition hover:border-slate-900">
              <p className="text-2xl font-semibold">{c.name}</p>
              <p className="mt-2 text-slate-600">{c.description}</p>
              <p className="mt-3 font-sans text-sm text-slate-500">{n} {n === 1 ? "article" : "articles"}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

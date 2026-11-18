import { Link, useParams, useSearchParams } from "react-router-dom";
import NotFoundState from "../../components/NotFoundState";
import { CATEGORIES, POSTS, categoryName } from "../../data/posts";
import { formatDate } from "../../utils/format";

// One component serves two routes: /blog and /blog/category/:categorySlug.
export default function PostFeed() {
  const { categorySlug } = useParams<{ categorySlug: string }>(); // undefined on /blog
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") ?? "";

  const category = categorySlug !== undefined ? CATEGORIES.find((c) => c.slug === categorySlug) : undefined;
  if (categorySlug !== undefined && !category) {
    return <NotFoundState tone="light" title="Category not found" message={`We don't have a category called "${categorySlug}".`} to="/blog/categories" label="Browse categories" />;
  }

  // ---- Derived from the URL: nothing is stored in state ----
  const pool = category ? POSTS.filter((p) => p.category === category.slug) : POSTS;
  const tags = [...new Set(pool.flatMap((p) => p.tags))].sort();
  const query = q.trim().toLowerCase();
  const posts = pool.filter((p) =>
    (tag === "" || p.tags.includes(tag)) &&
    (query === "" || `${p.title} ${p.excerpt}`.toLowerCase().includes(query))
  );
  const hasFilters = q !== "" || tag !== "";

  // Change one param, keep the rest (and the :categorySlug in the path is untouched).
  const update = (key: "q" | "tag", value: string) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: key === "q" });

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">{category ? category.name : "All posts"}</h1>
      <p className="mt-2 text-lg text-slate-600">{category ? category.description : "Notes on building, designing and growing in the craft."}</p>

      <div className="mt-6 space-y-3 font-sans">
        <input value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("q", e.target.value)}
          placeholder="Search articles…" aria-label="Search articles"
          className="focus-ring w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400" />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
          {tags.map((t) => (
            <button key={t} aria-pressed={tag === t} onClick={() => update("tag", tag === t ? "" : t)}
              className={`focus-ring rounded-full border px-3 py-1 text-sm transition ${
                tag === t ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-600 hover:border-slate-500"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <p className="text-xl font-semibold">No articles match</p>
          <p className="mt-1 font-sans text-sm text-slate-600">Nothing fits that search and tag together.</p>
          {hasFilters && (
            <button onClick={() => setSearchParams({})} className="focus-ring mt-4 rounded-lg bg-slate-900 px-4 py-2 font-sans text-sm font-semibold text-white hover:bg-slate-700">Clear filters</button>
          )}
        </div>
      ) : (
        <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
          {posts.map((p) => (
            <article key={p.slug} className="py-6">
              <Link to={`/blog/post/${p.slug}`} className="focus-ring rounded">
                <h2 className="text-2xl font-semibold leading-snug hover:text-blue-700">{p.title}</h2>
              </Link>
              <p className="mt-2 text-slate-600">{p.excerpt}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-slate-500">
                {/* Category badge is a Link into the category route */}
                <Link to={`/blog/category/${p.category}`} className="focus-ring rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-200">{categoryName(p.category)}</Link>
                <span>{p.author.name}</span><span>{formatDate(p.date)}</span><span>{p.readMinutes} min read</span>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

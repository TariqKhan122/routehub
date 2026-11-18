import { Link, useParams } from "react-router-dom";
import NotFoundState from "../../components/NotFoundState";
import { POSTS, categoryName, findPost } from "../../data/posts";
import { useGoBack } from "../../hooks/useGoBack";
import { formatDate } from "../../utils/format";

export default function PostReader() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const goBack = useGoBack("/blog"); // history back when possible, /blog for shared links
  const post = postSlug ? findPost(postSlug) : undefined;

  if (!post) {
    return <NotFoundState tone="light" title="Article not found" message="That article doesn't exist or may have been moved." to="/blog" label="Back to articles" />;
  }

  const related = POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3);

  return (
    <article>
      <button onClick={goBack} className="focus-ring rounded font-sans text-sm text-slate-500 hover:text-slate-900">← Back to articles</button>

      <header className="mt-6">
        <Link to={`/blog/category/${post.category}`} className="focus-ring rounded-full bg-slate-100 px-2.5 py-0.5 font-sans text-xs font-medium text-slate-700 hover:bg-slate-200">{categoryName(post.category)}</Link>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 font-sans text-sm text-slate-500">
          {post.author.name}, {post.author.role} · {formatDate(post.date)} · {post.readMinutes} min read
        </p>
      </header>

      <div className="mt-8 max-w-prose space-y-5 text-lg leading-8 text-slate-800">
        {post.body.map((para, i) => <p key={i} className={i === 0 ? "text-xl text-slate-900" : ""}>{para}</p>)}
      </div>

      {related.length > 0 && (
        <aside className="mt-12 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold">Keep reading</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}><Link to={`/blog/post/${r.slug}`} className="focus-ring rounded text-blue-700 hover:underline">{r.title}</Link></li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}

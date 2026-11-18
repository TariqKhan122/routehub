import { Link } from "react-router-dom";

const STACK = ["React 19", "TypeScript", "React Router 6", "Vite", "Tailwind CSS 4"];

export default function About() {
  return (
    <div className="max-w-prose">
      <h1 className="text-4xl font-bold tracking-tight">About Fieldnotes</h1>
      <p className="mt-5 text-xl leading-8">Fieldnotes is a small publication about building interfaces that hold up: routing you can reason about, design you can scan, and careers that compound.</p>
      <p className="mt-4 text-lg leading-8 text-slate-700">Every article is short enough to read in one sitting and specific enough to act on the same day.</p>

      <section className="mt-10 flex items-start gap-4 rounded-xl border border-slate-200 p-5">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-slate-900 font-sans font-semibold text-white">MB</div>
        <div>
          <p className="text-lg font-semibold">Maya Brennan</p>
          <p className="font-sans text-sm text-slate-500">Editor and staff frontend engineer</p>
          <p className="mt-2 text-slate-700">Maya has spent a decade building design systems and dashboards, and writes about the habits that keep large interfaces maintainable.</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Built with</h2>
        <ul className="mt-3 flex flex-wrap gap-2 font-sans text-sm">
          {STACK.map((s) => <li key={s} className="rounded-full border border-slate-300 px-3 py-1">{s}</li>)}
        </ul>
      </section>

      <Link to="/blog" className="focus-ring mt-10 inline-block rounded font-sans text-sm text-blue-700 hover:underline">Read the latest articles</Link>
    </div>
  );
}

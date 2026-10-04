import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <section className="border-b border-stone-200 bg-[radial-gradient(circle_at_top_right,_#dff4ef,_transparent_42%)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-700">A dictionary built together</p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-teal-950 sm:text-6xl">Rotuman words, shared by the people who know them.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Search Rotuman and English, discover meanings and examples, or contribute knowledge for community review. Lexicon RT is a starting point for a living Rotuman language resource.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/search" className="rounded-full bg-teal-950 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-900">Search the dictionary</Link>
              <Link to="/submit" className="rounded-full border border-teal-900/20 bg-white px-6 py-3 font-semibold text-teal-950 transition hover:bg-teal-50">Share a word</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {[
          ["01", "Search both ways", "Start with a Rotuman word or an English meaning. One search box, no dictionary expertise required."],
          ["02", "Contribute simply", "A word and meaning are enough to start. Examples, notes and other detail can be added when known."],
          ["03", "Review with care", "Contributions are proposals until trusted moderators review them. Published entries keep their history."],
        ].map(([n,title,body]) => <article key={n} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><span className="text-xs font-black tracking-widest text-teal-700">{n}</span><h2 className="mt-4 text-xl font-bold text-teal-950">{title}</h2><p className="mt-2 leading-7 text-slate-600">{body}</p></article>)}
      </section>
    </>
  );
}
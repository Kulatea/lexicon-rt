const queue = [
  { word: "fạeag", meaning: "to eat", contributor: "Community member", status: "1 of 2 approvals" },
  { word: "hanua", meaning: "land, country, place", contributor: "Anonymous contributor", status: "New submission" },
];

export function AdminPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Moderator workspace</p><h1 className="mt-2 text-4xl font-black tracking-tight text-teal-950">Review queue</h1><p className="mt-2 text-slate-600">Proposed knowledge stays separate from the published dictionary until it is approved.</p></div><div className="rounded-2xl bg-teal-950 px-5 py-3 text-white"><span className="block text-2xl font-black">{queue.length}</span><span className="text-xs text-teal-100">awaiting review</span></div></div>
      <div className="mt-8 space-y-4">{queue.map((item)=><article key={item.word} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-3"><h2 className="text-2xl font-black text-teal-950">{item.word}</h2><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{item.status}</span></div><p className="mt-2 text-lg text-slate-700">{item.meaning}</p><p className="mt-3 text-xs text-slate-400">Submitted by {item.contributor}</p></div><div className="flex gap-2"><button className="rounded-full border border-stone-300 px-4 py-2 text-sm font-bold text-slate-700">Edit</button><button className="rounded-full bg-teal-950 px-4 py-2 text-sm font-bold text-white">Approve</button></div></div></article>)}</div>
      <p className="mt-6 rounded-2xl border border-dashed border-stone-300 p-4 text-sm leading-6 text-slate-500">Prototype note: the approval threshold will be configurable. Edits and approvals will be retained in the entry's revision history.</p>
    </section>
  );
}
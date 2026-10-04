import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { CharacterToolbar } from "../../../../shared/components/CharacterToolbar";
import { searchPublished } from "../../../../shared/supabase";

type Result={entry_id:string;word:string;definition:string;part_of_speech:string;example:string|null};

export function SearchPage() {
  const [query,setQuery]=useState(""); const [searchedQuery,setSearchedQuery]=useState(""); const [results,setResults]=useState<Result[]>([]); const [isLoading,setIsLoading]=useState(false); const [error,setError]=useState("");
  const searchInputRef=useRef<HTMLInputElement>(null);
  async function handleSearch(event:FormEvent<HTMLFormElement>){event.preventDefault();const cleaned=query.trim();setSearchedQuery(cleaned);setError("");if(!cleaned){setResults([]);return;}setIsLoading(true);try{setResults(await searchPublished(cleaned));}catch(err){setError(err instanceof Error?err.message:"Search failed");setResults([]);}finally{setIsLoading(false);}}
  const hasSearched=searchedQuery.length>0;
  return <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Rotuman ↔ English</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight text-teal-950">Find a word or meaning.</h1>
    <p className="mt-3 text-slate-600">Search in either language. Special Rotuman characters are available below the search box when you need them.</p>
    <form onSubmit={handleSearch} className="mt-7 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex gap-2"><input ref={searchInputRef} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a Rotuman word or English meaning…" className="min-w-0 flex-1 rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"/><button className="rounded-xl bg-teal-950 px-5 py-3 font-bold text-white">Search</button></div>
      <CharacterToolbar targetRef={searchInputRef} onInsert={setQuery}/>
    </form>
    {isLoading&&<p className="mt-8 text-sm text-slate-500">Searching dictionary…</p>}
    {error&&<p className="mt-8 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {hasSearched&&!isLoading&&!error&&results.length===0&&<div className="mt-8 rounded-3xl border border-dashed border-stone-300 p-8 text-center"><h2 className="font-bold text-teal-950">Nothing found for “{searchedQuery}”</h2><p className="mt-2 text-sm text-slate-500">No published community-reviewed entry matches yet.</p></div>}
    {!isLoading&&results.length>0&&<div className="mt-8"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">{results.length} {results.length===1?"result":"results"}</p><ul className="space-y-4">{results.map((entry,i)=><li key={entry.entry_id+"-"+i} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-black text-teal-950">{entry.word}</h2><p className="mt-2 text-lg text-slate-700">{entry.definition}</p></div>{entry.part_of_speech&&<span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">{entry.part_of_speech}</span>}</div>{entry.example&&<div className="mt-5 rounded-2xl bg-stone-50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Example</p><p className="mt-1 italic text-slate-600">{entry.example}</p></div>}<p className="mt-4 text-xs text-slate-400">Community-reviewed entry</p></li>)}</ul></div>}
  </section>;
}

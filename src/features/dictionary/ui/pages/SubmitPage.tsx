import { useState } from "react";
import type { FormEvent } from "react";
import { AuthGate } from "../../../../shared/components/AuthGate";
import { submitContribution } from "../../../../shared/supabase";

export function SubmitPage() {
  return <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Community contribution</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight text-teal-950">Share what you know.</h1>
    <p className="mt-3 max-w-2xl leading-7 text-slate-600">You only need a Rotuman word and an English meaning. Every contribution is reviewed before publication.</p>
    <AuthGate title="Sign in to contribute"><ContributionForm /></AuthGate>
  </section>;
}

function ContributionForm(){
  const [more,setMore]=useState(false); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  const [word,setWord]=useState(""); const [meaning,setMeaning]=useState(""); const [example,setExample]=useState(""); const [part,setPart]=useState(""); const [notes,setNotes]=useState("");
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");try{
    await submitContribution({headword:word,englishMeaning:meaning,exampleRotuman:example,partOfSpeech:part,usageNotes:notes});
    setWord("");setMeaning("");setExample("");setPart("");setNotes("");setMessage("Submitted. Your contribution is now in the moderator review queue.");
  }catch(err){setMessage(err instanceof Error?err.message:"Submission failed");}finally{setBusy(false);}}
  return <form className="mt-8 space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={submit}>
    <label className="block"><span className="font-semibold text-slate-800">Rotuman word <b className="text-teal-700">*</b></span><input required value={word} onChange={e=>setWord(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" placeholder="Enter the word" /></label>
    <label className="block"><span className="font-semibold text-slate-800">English meaning <b className="text-teal-700">*</b></span><textarea required value={meaning} onChange={e=>setMeaning(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" placeholder="What does it mean?" /></label>
    <label className="block"><span className="font-semibold text-slate-800">Example sentence <span className="font-normal text-slate-400">optional</span></span><textarea value={example} onChange={e=>setExample(e.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" placeholder="How is the word used?" /></label>
    <button type="button" onClick={()=>setMore(!more)} className="text-sm font-bold text-teal-800 hover:underline">{more?"− Hide extra details":"+ Add more detail"}</button>
    {more&&<div className="grid gap-4 rounded-2xl bg-stone-50 p-4 sm:grid-cols-2"><label className="text-sm font-semibold">Part of speech<input value={part} onChange={e=>setPart(e.target.value)} className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 font-normal" placeholder="e.g. noun" /></label><label className="text-sm font-semibold">Usage or context<input value={notes} onChange={e=>setNotes(e.target.value)} className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 font-normal" placeholder="Regional, family, formal…" /></label></div>}
    {message&&<p className="rounded-xl bg-stone-50 p-3 text-sm text-slate-700">{message}</p>}
    <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-5"><p className="text-xs leading-5 text-slate-500">Submissions are reviewed before becoming part of the dictionary.</p><button disabled={busy} className="shrink-0 rounded-full bg-teal-950 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy?"Submitting…":"Submit for review"}</button></div>
  </form>;
}

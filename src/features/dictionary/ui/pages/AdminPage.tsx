import { useEffect, useState } from "react";
import { AuthGate } from "../../../../shared/components/AuthGate";
import { getModerationQueue, getMyRole, reviewContribution, type ModerationItem } from "../../../../shared/supabase";

export function AdminPage(){
  return <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Moderator workspace</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight text-teal-950">Review queue</h1>
    <p className="mt-2 text-slate-600">Proposed knowledge stays separate from the published dictionary until the configured approval threshold is reached.</p>
    <AuthGate title="Moderator sign in"><ReviewQueue /></AuthGate>
  </section>;
}

function ReviewQueue(){
  const [items,setItems]=useState<ModerationItem[]>([]); const [role,setRole]=useState<string|null>(null); const [loading,setLoading]=useState(true); const [message,setMessage]=useState("");
  async function load(){setLoading(true);setMessage("");try{const r=await getMyRole();setRole(r);if(r==="moderator"||r==="administrator")setItems(await getModerationQueue());}catch(err){setMessage(err instanceof Error?err.message:"Could not load review queue");}finally{setLoading(false);}}
  useEffect(()=>{void load();},[]);
  async function decide(id:string,decision:"approve"|"request_changes"|"reject"){setMessage("");try{const result=await reviewContribution(id,decision);const row=result?.[0];setMessage(decision==="approve"?`Approval recorded: ${row?.approval_count ?? "?"} of ${row?.required_approvals ?? "?"}. ${row?.status==="published"?"The entry is now published.":""}`:decision==="reject"?"Contribution rejected.":"Changes requested.");await load();}catch(err){setMessage(err instanceof Error?err.message:"Review action failed");}}
  if(loading)return <p className="mt-8 text-sm text-slate-500">Loading review access…</p>;
  if(role!=="moderator"&&role!=="administrator")return <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black text-amber-950">Moderator access required</h2><p className="mt-2 text-sm text-amber-900">Your account is signed in as a contributor. Moderator permissions are assigned separately so they cannot be self-granted.</p></div>;
  return <div className="mt-8">
    {message&&<p className="mb-4 rounded-xl bg-stone-100 p-3 text-sm text-slate-700">{message}</p>}
    <div className="mb-4 inline-flex rounded-2xl bg-teal-950 px-5 py-3 text-white"><span className="mr-2 text-2xl font-black">{items.length}</span><span className="self-center text-xs text-teal-100">awaiting review</span></div>
    <div className="space-y-4">{items.map(item=><article key={item.contribution_id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-3"><h2 className="text-2xl font-black text-teal-950">{item.word}</h2><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{item.approval_count} of {item.required_moderator_approvals} approvals</span></div><p className="mt-2 text-lg text-slate-700">{item.definition}</p>{item.part_of_speech&&<p className="mt-1 text-sm text-slate-500">{item.part_of_speech}</p>}{item.example_rotuman&&<p className="mt-3 italic text-slate-600">{item.example_rotuman}</p>}</div><div className="flex flex-wrap gap-2"><button onClick={()=>void decide(item.contribution_id,"request_changes")} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-bold text-slate-700">Request changes</button><button onClick={()=>void decide(item.contribution_id,"reject")} className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700">Reject</button><button onClick={()=>void decide(item.contribution_id,"approve")} className="rounded-full bg-teal-950 px-4 py-2 text-sm font-bold text-white">Approve</button></div></div></article>)}</div>
    {items.length===0&&<p className="rounded-2xl border border-dashed border-stone-300 p-6 text-sm text-slate-500">Nothing is waiting for review.</p>}
  </div>;
}

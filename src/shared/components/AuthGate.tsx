import { useState } from "react";
import { getSession, signIn, signUp } from "../supabase";

export function AuthGate({ children, title="Sign in to continue" }:{children:React.ReactNode;title?:string}) {
  const [session,setSession]=useState(getSession());
  const [mode,setMode]=useState<"signin"|"signup">("signin");
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState("");
  const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  if(session) return <>{children}</>;
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage("");try{
    if(mode==="signin"){setSession(await signIn(email,password));}
    else {const result=await signUp(email,password,name); if(result.access_token)setSession(getSession()); else setMessage("Account created. Check your email to confirm it, then sign in.");}
  }catch(err){setMessage(err instanceof Error?err.message:"Authentication failed");}finally{setBusy(false);}}
  return <div className="mx-auto mt-8 max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-black text-teal-950">{title}</h2>
    <p className="mt-2 text-sm text-slate-500">Accounts help protect contributions and preserve attribution and revision history.</p>
    <form onSubmit={submit} className="mt-5 space-y-3">
      {mode==="signup"&&<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Display name" className="w-full rounded-xl border border-stone-300 px-4 py-3"/>}
      <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-stone-300 px-4 py-3"/>
      <input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-stone-300 px-4 py-3"/>
      <button disabled={busy} className="w-full rounded-xl bg-teal-950 px-4 py-3 font-bold text-white disabled:opacity-50">{busy?"Working…":mode==="signin"?"Sign in":"Create account"}</button>
    </form>
    {message&&<p className="mt-3 text-sm text-slate-600">{message}</p>}
    <button type="button" onClick={()=>{setMode(mode==="signin"?"signup":"signin");setMessage("");}} className="mt-4 text-sm font-bold text-teal-800 hover:underline">{mode==="signin"?"Need an account? Create one":"Already have an account? Sign in"}</button>
  </div>;
}

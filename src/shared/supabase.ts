const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const SESSION_KEY = "lexicon-rt-session";

export type Session = { access_token: string; refresh_token?: string; user: { id: string; email?: string } };
export type ModerationItem = {
  contribution_id: string; status: string; submitted_at: string; word: string; definition: string;
  part_of_speech: string | null; example_rotuman: string | null; usage_notes: string | null;
  contributor_id: string; approval_count: number; required_moderator_approvals: number;
};

function configured() { return Boolean(SUPABASE_URL && SUPABASE_KEY); }
function headers(auth = false) {
  const h: Record<string,string> = { apikey: SUPABASE_KEY ?? "", "Content-Type": "application/json" };
  if (auth) { const s=getSession(); if(s) h.Authorization="Bearer "+s.access_token; }
  return h;
}
async function request(path:string, init:RequestInit={}) {
  if(!configured()) throw new Error("The development backend is not configured yet.");
  const response=await fetch((SUPABASE_URL ?? "")+path, init);
  const text=await response.text(); const body=text ? JSON.parse(text) : null;
  if(!response.ok) throw new Error(body?.msg ?? body?.message ?? body?.error_description ?? body?.error ?? "Request failed");
  return body;
}
export function getSession():Session|null { try { const raw=localStorage.getItem(SESSION_KEY); return raw?JSON.parse(raw):null; } catch { return null; } }
export function clearSession(){ localStorage.removeItem(SESSION_KEY); }
function saveSession(data:any):Session { const session:Session={access_token:data.access_token,refresh_token:data.refresh_token,user:data.user}; localStorage.setItem(SESSION_KEY,JSON.stringify(session)); return session; }

export async function signIn(email:string,password:string){ return saveSession(await request("/auth/v1/token?grant_type=password",{method:"POST",headers:headers(),body:JSON.stringify({email,password})})); }
export async function signUp(email:string,password:string,displayName:string){
  const data=await request("/auth/v1/signup",{method:"POST",headers:headers(),body:JSON.stringify({email,password,data:{display_name:displayName}})});
  if(data.access_token) saveSession(data);
  return data;
}
export async function getMyRole(){
  const s=getSession(); if(!s) return null;
  const rows=await request("/rest/v1/profiles?select=role&user_id=eq."+encodeURIComponent(s.user.id),{headers:headers(true)});
  return rows?.[0]?.role ?? null;
}
export async function submitContribution(input:{headword:string;englishMeaning:string;partOfSpeech?:string;exampleRotuman?:string;usageNotes?:string}){
  return request("/rest/v1/rpc/submit_dictionary_contribution",{method:"POST",headers:headers(true),body:JSON.stringify({
    p_headword:input.headword,p_english_meaning:input.englishMeaning,p_part_of_speech:input.partOfSpeech||null,
    p_example_rotuman:input.exampleRotuman||null,p_example_english:null,p_usage_notes:input.usageNotes||null,p_target_entry_id:null
  })});
}
export async function getModerationQueue():Promise<ModerationItem[]> {
  return request("/rest/v1/moderation_queue?select=*&order=submitted_at.asc",{headers:headers(true)});
}
export async function reviewContribution(id:string,decision:"approve"|"request_changes"|"reject",notes?:string){
  return request("/rest/v1/rpc/review_dictionary_contribution",{method:"POST",headers:headers(true),body:JSON.stringify({p_contribution_id:id,p_decision:decision,p_notes:notes||null})});
}
export async function searchPublished(query:string){
  const q=query.trim(); if(!q) return [];
  const encoded=encodeURIComponent("*"+q+"*");
  return request("/rest/v1/published_dictionary?select=*&or=(word.ilike."+encoded+",definition.ilike."+encoded+",part_of_speech.ilike."+encoded+",example.ilike."+encoded+")&order=word.asc",{headers:headers(Boolean(getSession()))});
}

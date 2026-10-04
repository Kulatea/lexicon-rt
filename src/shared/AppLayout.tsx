import { NavLink, Outlet } from "react-router-dom";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? "bg-teal-950 text-white" : "text-slate-600 hover:bg-stone-100 hover:text-teal-950"}`;

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-slate-900">
      <header className="border-b border-stone-200 bg-[#fbfaf6]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <NavLink to="/" className="group">
            <span className="block text-xl font-black tracking-tight text-teal-950">Lexicon RT</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-700 sm:block">Rotuman community dictionary</span>
          </NavLink>
          <nav className="flex items-center gap-1">
            <NavLink to="/search" className={navClass}>Dictionary</NavLink>
            <NavLink to="/submit" className={navClass}>Contribute</NavLink>
            <NavLink to="/admin" className={navClass}>Review</NavLink>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="mt-16 border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p><strong className="text-teal-950">Lexicon RT</strong> · built for the Rotuman community.</p>
          <p>Community knowledge, carefully reviewed.</p>
        </div>
      </footer>
    </div>
  );
}
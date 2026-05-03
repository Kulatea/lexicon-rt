import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">
            Lexicon RT
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link to="/search" className="hover:underline">
              Search
            </Link>
            <Link to="/submit" className="hover:underline">
              Submit
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-slate-500">
          Rotuman Community Dictionary
        </div>
      </footer>
    </div>
  );
}
import { useState } from "react";
import type { FormEvent } from "react";
import type { DictionaryEntry } from "../../domain/DictionaryEntry";
import { searchDictionaryWithMockData } from "../../application/searchDictionaryService";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedQuery = query.trim();
    setSearchedQuery(cleanedQuery);

    if (!cleanedQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const entries = await searchDictionaryWithMockData(cleanedQuery);
    setResults(entries);
    setIsLoading(false);
  }

  const hasSearched = searchedQuery.length > 0;
  const showNoResults = hasSearched && !isLoading && results.length === 0;

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Dictionary Search
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Search Rotuman words, meanings, and examples.
      </p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a word or meaning..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <p className="mt-6 text-sm text-slate-500">Searching dictionary...</p>
      )}

      {showNoResults && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 text-center">
          <p className="text-base font-medium text-slate-700">
            No results found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different word or a shorter search term.
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <ul className="mt-6 space-y-3">
          {results.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  {entry.word}
                </h2>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                  {entry.partOfSpeech}
                </span>
              </div>

              <p className="mt-2 text-slate-700">{entry.definition}</p>

              {entry.example && (
                <p className="mt-3 border-l-2 border-slate-200 pl-3 text-sm italic text-slate-600">
                  {entry.example}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

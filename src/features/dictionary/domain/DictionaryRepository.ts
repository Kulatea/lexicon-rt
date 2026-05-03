import type { DictionaryEntry } from "./DictionaryEntry";

export interface DictionaryRepository {
  search(query: string): Promise<DictionaryEntry[]>;
}

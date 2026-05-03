import type { DictionaryEntry } from "../domain/DictionaryEntry";
import type { DictionaryRepository } from "../domain/DictionaryRepository";

export async function searchDictionary(
  repository: DictionaryRepository,
  query: string,
): Promise<DictionaryEntry[]> {
  return repository.search(query);
}

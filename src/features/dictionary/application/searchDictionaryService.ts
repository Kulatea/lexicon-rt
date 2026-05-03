import type { DictionaryEntry } from "../domain/DictionaryEntry";
import { MockDictionaryRepository } from "../infrastructure/MockDictionaryRepository";
import { searchDictionary } from "./searchDictionary";

const repository = new MockDictionaryRepository();

export async function searchDictionaryWithMockData(
  query: string,
): Promise<DictionaryEntry[]> {
  return searchDictionary(repository, query);
}

import type { DictionaryEntry } from "../domain/DictionaryEntry";
import type { DictionaryRepository } from "../domain/DictionaryRepository";

const mockEntries: DictionaryEntry[] = [
  {
    id: "1",
    word: "fạeag",
    definition: "to eat",
    partOfSpeech: "verb",
    example: "E la fạeag 'on te hanua.",
  },
  {
    id: "2",
    word: "hanua",
    definition: "land, country, place",
    partOfSpeech: "noun",
    example: "Noa hanua ma 'on fak Rotuma.",
  },
  {
    id: "3",
    word: "sạksạk",
    definition: "to run quickly",
    partOfSpeech: "verb",
  },
  {
    id: "4",
    word: "mauri",
    definition: "life, health, well-being",
    partOfSpeech: "noun",
    example: "Mauri lelei!",
  },
  {
    id: "5",
    word: "lelei",
    definition: "good, fine, well",
    partOfSpeech: "adjective",
  },
  {
    id: "6",
    word: "noa",
    definition: "to live, stay, dwell",
    partOfSpeech: "verb",
    example: "E noa ta ne'ne'i Rotuma.",
  },
];

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

export class MockDictionaryRepository implements DictionaryRepository {
  async search(query: string): Promise<DictionaryEntry[]> {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return [];
    }

    return mockEntries.filter((entry) => {
      const word = normalize(entry.word);
      const definition = normalize(entry.definition);
      const partOfSpeech = normalize(entry.partOfSpeech);
      const example = normalize(entry.example ?? "");

      return (
        word.includes(normalizedQuery) ||
        definition.includes(normalizedQuery) ||
        partOfSpeech.includes(normalizedQuery) ||
        example.includes(normalizedQuery)
      );
    });
  }
}

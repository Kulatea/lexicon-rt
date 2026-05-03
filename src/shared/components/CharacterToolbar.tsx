import type { RefObject } from "react";
import { ROTUMAN_CHARACTERS } from "../../features/dictionary/domain/rotumanCharacters";
import { useInsertAtCursor } from "../hooks/useInsertAtCursor";

type EditableElement = HTMLInputElement | HTMLTextAreaElement;

type CharacterToolbarProps = {
  targetRef: RefObject<EditableElement | null>;
  onInsert: (nextValue: string) => void;
};

export function CharacterToolbar({ targetRef, onInsert }: CharacterToolbarProps) {
  const insertAtCursor = useInsertAtCursor();

  function handleInsert(character: string) {
    const nextValue = insertAtCursor(targetRef.current, character);

    if (nextValue !== null) {
      onInsert(nextValue);
    }
  }

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2">
      <div className="flex flex-wrap gap-1.5">
        {ROTUMAN_CHARACTERS.map(({ char, label }) => (
          <button
            key={char}
            type="button"
            title={label}
            onClick={() => handleInsert(char)}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}

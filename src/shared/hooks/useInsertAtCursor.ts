import { useCallback } from "react";

type EditableElement = HTMLInputElement | HTMLTextAreaElement;

export function useInsertAtCursor() {
  return useCallback(
    (target: EditableElement | null, textToInsert: string): string | null => {
      if (!target) {
        return null;
      }

      const selectionStart = target.selectionStart ?? target.value.length;
      const selectionEnd = target.selectionEnd ?? selectionStart;
      const currentValue = target.value;

      const nextValue =
        currentValue.slice(0, selectionStart) +
        textToInsert +
        currentValue.slice(selectionEnd);

      target.value = nextValue;

      const cursorPosition = selectionStart + textToInsert.length;
      target.focus();
      target.setSelectionRange(cursorPosition, cursorPosition);

      return nextValue;
    },
    [],
  );
}

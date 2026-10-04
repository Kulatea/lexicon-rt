# ADR 0002: Portable community stewardship

Status: Accepted

## Context
Lexicon RT is being prototyped with the intention that stewardship may later pass to a Rotuman community organisation.

## Decision
Do not make core dictionary data, authorization, or export dependent on the prototype creator or Vercel-specific storage. Administrative roles are data/configuration, not a hard-coded personal identity. Preserve provenance and make community data exportable.

## Consequences
Infrastructure choices should favour standard data models and straightforward backup/export. A future steward should be able to move hosting or ownership without rebuilding the dictionary.

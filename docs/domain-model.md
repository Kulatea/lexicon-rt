# Lexicon RT Domain Model

## DictionaryEntry
Stable identity for a Rotuman lexical entry. It points to the currently published revision and can accumulate history.

## EntryRevision
A versioned snapshot of publishable content. Expected content includes the headword and one or more senses, with optional part-of-speech, examples, variants, usage notes, source/provenance and later pronunciation data.

## Sense
A distinct meaning or usage. Multiple legitimate meanings are represented separately rather than voted into a single winner.

## Contribution
A user's proposal to add or improve knowledge. Types support new-entry and revise-entry flows. A contributor may choose anonymous public attribution while the system retains authenticated identity needed for abuse controls and provenance.

## ModerationReview
A moderator's decision and optional notes against a candidate revision. The approval threshold is configuration. Publication occurs only when moderation policy is satisfied.

## Roles
Initial conceptual roles: Reader, Contributor, Trusted Contributor, Moderator, Administrator.

Role elevation is deliberate. Contribution count can be a useful signal but does not automatically grant moderation authority.

## Future extensions
The model should be able to add community questions, supporting attestations, audio recordings, phrases and grammar resources without pretending those are dictionary entries.

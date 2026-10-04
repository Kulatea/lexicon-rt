# Lexicon RT Architecture

## Goal
Keep the community dictionary domain portable, testable, and independent of React, Vercel, authentication vendors, and storage vendors.

## Layers
- Domain: dictionary entries, senses, contributions, revisions, reviews, roles, and invariant rules.
- Application: search, submit contribution, review contribution, publish revision, inspect history.
- Infrastructure: persistence, search adapter, authentication identity mapping, clocks/IDs, external services.
- UI: React routes/components consuming application services rather than persistence directly.

The existing feature/domain/application/infrastructure/UI direction is retained.

## Core model direction
A published dictionary entry is not the same thing as a submission. DictionaryEntry identifies a Rotuman lexical entry. Sense represents one meaning/usage and multiple senses are first-class. Contribution is a proposal. EntryRevision is an immutable candidate/published snapshot. ModerationReview records a moderator decision. ContributorIdentity separates internal identity from optional public attribution.

Publication derives from an approved revision, preserving prior revisions rather than mutating history away.

## Moderation
Required approval count is configuration, not a domain constant. Rejection and requested changes must be representable. Moderator edits remain attributable.

## Persistence boundary
Application code depends on repository interfaces. Storage must support export/backup without requiring Vercel-specific data formats.

## Security boundary
Browsing published content is public. Contribution and moderation authorization are server-authoritative application concerns backed by authenticated identities.

## Deployment
Vercel is the current delivery platform. It is not part of the core domain model.

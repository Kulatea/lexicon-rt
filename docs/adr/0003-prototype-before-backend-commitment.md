# ADR 0003: Validate product flow before backend commitment

Status: Accepted

## Context
The original repository is an early React/Vite scaffold with mock dictionary data. Persistence and authentication choices would be expensive to unwind if made before the contribution and moderation experience is understood.

## Decision
Build and review the core home, search, contribution and moderation experience as a Vercel preview before selecting the persistent backend/auth stack.

## Consequences
The prototype remains intentionally non-persistent. The next architecture decision after product review will select persistence and authentication against explicit requirements rather than convenience alone.

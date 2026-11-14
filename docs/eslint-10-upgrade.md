# ESLint 10 upgrade validation

Tracks koltregaskes/rooms-os-hub#427 and #1541; draw-fast PR #10.
Reviewed https://eslint.org/docs/latest/use/migrate-to-9.0.0 and
https://eslint.org/docs/latest/use/migrate-to-10.0.0 plus Next 16 ESLint guidance.

Migrated the old config to eslint.config.mjs (legacy config archived here).
Uses ESLint 10 and eslint-config-next 16.4.6: the latter fixes removed ESLint
context APIs used by older React integration. Declares supported Node versions
and replaces removed next lint. One line-specific set-state-in-effect exception
is documented where an effect exposes the newly constructed external realtime
connection callback; no global rules disabled. Existing unused-disable warning
in LockupLink is retained. Next baseline patched to 16.4.6 for its advisory.

Node 26.13.1, Gaming-Laptop, 14 Nov 2026: install with legacy-peer-deps,
lint (0 errors, 1 existing warning), typecheck, and regression test all pass.
The regression test verifies valid TSX parses and conditional hooks still fail.
The legacy fal proxy peer range remains a baseline limitation; Node 22 CI uses
legacy-peer-deps explicitly. No image-generation service or credentials used.

Production build and headless Edge freehand drawing also pass (one draw shape,
zero page errors, fal endpoint blocked). Independent review still required.

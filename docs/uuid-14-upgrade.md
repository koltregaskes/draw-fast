# UUID 14 upgrade validation

Tracked by koltregaskes/rooms-os-hub#427 and #1541.

Reviewed UUID 9→14 changes: ESM-only from v12, browser-first exports from v13,
global Web Crypto / Node 20+ and TypeScript 5.4.3+ from v14.
Source: https://github.com/uuidjs/uuid/blob/v14.0.0/CHANGELOG.md

The live-image hook already imports v4 as ESM. Raised the TypeScript floor,
removed obsolete @types/uuid, and declared Node >=20.9 for Next 16.
Replaced removed `next lint` with the ESLint CLI. Updated the existing Next 16
baseline from 16.4.0 to 16.4.6 after the build reported a security advisory.
No application UI or generation behaviour was changed.

Gaming-Laptop, 14 November 2026, Node 26.13.1:
- Install: npm install --legacy-peer-deps --ignore-scripts, successful.
- Lint, tsc --noEmit, npm test, browser-condition UUID test: pass.
- Production build: pass, all four pages generated.
- Built app in headless installed Edge: draw tool created one freehand shape,
  zero page errors. The fal endpoint was intercepted with 503 to prevent spend.
  This does not test paid image generation.

Existing peer limitation: @fal-ai/serverless-proxy@0.6.0 declares Next 13/14,
while main already uses Next 16. Installation uses --legacy-peer-deps explicitly;
this PR does not claim the peer conflict has been resolved. CI now validates
install/lint/UUID tests/build on Node 22. Independent review remains required.

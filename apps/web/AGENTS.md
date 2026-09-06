# Web app rules

- Read `node_modules/next/dist/docs/` before changing Next.js behavior.
- Cache Components and Partial Prefetching are enabled. Keep the shared App Shell static and put URL reads below leaf Suspense boundaries.
- Read Payload only through `src/lib/content.ts`; do not add REST round trips for CMS content.
- App components may not import React Aria, Lucide or add ad hoc visual classes. Extend `@repo/ui` instead.
- Forms use React Aria wrappers, ky, shared Zod contracts and server-side validation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

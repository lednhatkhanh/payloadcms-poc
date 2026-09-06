# CMS app rules

- Follow the installed Payload skill and the bundled `next` documentation.
- Generated Payload route files stay thin and may be regenerated.
- Collections, globals, access control and hooks belong in `packages/payload-config`.
- Keep Admin theming light. Map shared semantic variables; do not replace Payload's built-in controls.
- Do not enable Cache Components or Partial Prefetching in the CMS app.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

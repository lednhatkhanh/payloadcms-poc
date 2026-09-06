# Repository rules

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

Before writing Next.js code, read the relevant version-matched guide under each app's
`node_modules/next/dist/docs/`. In this monorepo, resolve the installed `next` package from the app
directory. Follow current deprecations and error-page guidance rather than training memory.

This block is managed by Next.js 16.3+ and may be refreshed by `next dev`.

<!-- END:nextjs-agent-rules -->

This is a Node.js 24, pnpm 12, TypeScript 7, React 19, Next.js 16 and Payload 3 monorepo.

## Architecture

- `apps/web` is the public site. It reads Payload only through server-only Local API modules.
- `apps/cms` owns Payload Admin and HTTP APIs.
- Payload config and generated types belong to `packages/payload-config`.
- Shared form contracts belong to `packages/contracts`.
- All application UI must use `packages/ui`.

## Demo scope

- Treat this repository as a greenfield demo with one canonical current implementation.
- Do not add or retain legacy aliases, backward-compatibility branches, migration shims, repair-only seed modes, or fallback content that masks missing required CMS data.
- When a canonical route, locale, schema, or seed changes, update the original demo migrations and seed data, then reset the demo database instead of preserving old behavior.
- Framework-required loading and error boundaries and explicit product defaults are allowed; they are not compatibility layers.

## Presentation synchronization

- `apps/slides/slides.md` is the canonical content source. Its editable Google Slides companion is https://docs.google.com/presentation/d/1iL6dRuwJaBpfwgokHBY0m0AyClTgALUG6SGwGdc2BEM/edit.
- When changing local slide content, order, speaker notes, styling, or referenced diagram images, also update that same Google Slides presentation in the same task. This is standing authorization for these matching updates; do not ask again solely to synchronize the deck.
- Follow `apps/slides/README.md`. Preserve editable text and native tables, retain architecture diagrams as images, and preserve notes, sharing and the presentation ID. Do not replace the companion with a newly imported deck.
- Check local exports and the Google Slides readback; visually inspect the affected slides for wrapping, clipping, alignment, spacing, contrast and image proportions. Inspect every slide after structural or deck-wide changes. A successful API write alone is not verification.
- If access or tooling blocks the remote update, finish the local work and explicitly report that Google Slides remains out of sync, including the affected changes. Never claim synchronization without readback and visual verification.

## Styling

- Never add hardcoded colors, spacing, radii, borders, shadows or typography in application code.
- Never use arbitrary Tailwind values. Add a named token or CVA variant in `packages/ui`.
- Application pages must not use ad hoc `className` values. Compose the shared layout and UI primitives.
- Light theme only. Do not add dark-mode selectors or variants.
- `#bd0f72` is the canonical brand 700 value. Use semantic aliases rather than raw palette utilities.
- Noto Sans is the only text face.

## Interaction and icons

- Use the shared React Aria wrappers. Do not import `react-aria-components` from either app.
- Do not create raw buttons, inputs, textareas or checkboxes when a shared wrapper exists.
- Use React Aria `onPress` semantics for pressable controls.
- Import icons through `@repo/ui/icon`; no raw SVG interface icons, icon fonts or emoji controls.
- Decorative icons are hidden from assistive technology. Icon-only buttons require accessible labels.

## Payload and Next.js

- Payload imports are server-only. Never expose config, secrets, drafts or submission data to client bundles.
- Public Local API reads must set `overrideAccess: false`, `draft: false`, bounded depth and selected fields.
- Cache Components and Partial Prefetching are enabled only in the web app. Keep static UI outside Suspense and push request-time and URL-specific reads down.
- Every visible Suspense boundary must use an accessible shared skeleton that closely matches the resolved layout and reserves its space. Keep skeletons beside the async content they represent, respect reduced motion, and never use generic loading text or a blank fallback for content users expect to see.
- Do not add `dynamic`, `revalidate`, `fetchCache` or legacy PPR flags.
- Use the supported Next.js React Compiler. Oxlint is lint-only; do not add a second compiler transform.

## TypeScript and quality

- ESM and strict TypeScript only. No `any`, enums, namespaces, parameter properties or unchecked assertions.
- Prefer named imports from `es-toolkit` when they make collection or object transformations shorter and clearer than custom code. Never import from `es-toolkit/compat`, and keep a direct native expression when it is already simpler.
- Use `date-fns` for date parsing, validation, comparison, arithmetic and formatting. Native `Date` construction and ISO serialization are fine when no date utility logic is involved; `Intl` is fine when an explicit locale or time zone is the point.
- Add `es-toolkit` or `date-fns` to the dependency list of each workspace package that imports it; do not rely on hoisted transitive dependencies.
- Do not introduce or retain APIs marked `@deprecated` by installed type definitions or current
  documentation. Treat deprecation diagnostics as errors, migrate to the supported replacement and
  never hide them with casts or suppression comments.
- Prefer functions and composition over classes and boolean-prop proliferation.
- Never swallow errors or promises.
- Run `pnpm check` before handing off changes. Run both Next builds when PostgreSQL is available.

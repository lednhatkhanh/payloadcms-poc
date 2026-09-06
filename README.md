# Payload Newsroom

A Turborepo containing three applications: a standalone Payload CMS, a separate Next.js
public site that consumes Payload through the Local API, and the Slidev platform-decision deck.

## Requirements

- Node.js 24.20+
- pnpm 12.3.4+
- Docker with Compose

## Start locally

```bash
cp .env.example .env
pnpm install
pnpm db:up
pnpm db:migrate
pnpm seed
pnpm dev
```

- Web: http://payload-newsroom.localhost
- Payload Admin: http://cms.payload-newsroom.localhost/admin
- Platform-decision slides: http://slides.payload-newsroom.localhost

Portless starts all three apps on stable local domains using HTTP (`PORTLESS_HTTPS=0`).
The first `pnpm dev` may ask for permission to bind its HTTP proxy to port 80.
If permission is unavailable, Portless falls back to port 1355; append `:1355` to the local hostnames. To restore the port-free URLs, run these commands in an interactive terminal and accept the sudo prompt:

```bash
pnpm exec portless proxy stop
pnpm exec portless proxy start --no-tls --port 80
pnpm dev
```

The first visit to Payload Admin creates the initial administrator account.

The slide deck can also run independently without the database:

```bash
pnpm slides:dev
```

Its source and generated PDF live in [`apps/slides`](apps/slides). Regenerate the PDF with
`pnpm slides:export`.

The [editable Google Slides deck](https://docs.google.com/presentation/d/1iL6dRuwJaBpfwgokHBY0m0AyClTgALUG6SGwGdc2BEM/edit)
is the presentation companion. Keep it synchronized with local slide changes using the
[slide maintenance workflow](apps/slides/README.md).

## Rebuild the demo database

The seed is idempotent, so use this after changing content or seed data:

```bash
pnpm db:migrate
pnpm seed
```

To verify a completely fresh local setup, use the reset-and-reseed command below. It removes only this project’s Docker volume and recreates all local demo records:

```bash
pnpm db:reseed
```

See [local setup and recovery](docs/local-setup.md) for the short recovery checklist, [public content](docs/public-content.md) for the page map, and the [SEO guide](docs/seo.md) for metadata and crawler settings.

## Payload Admin import map

Payload Admin uses a generated import map for its configured components. `pnpm dev` generates it automatically before starting the CMS, so a normal local start needs no extra command.

After changing the Payload Admin configuration or its custom components while the dev server is already running, regenerate the map and restart the CMS:

```bash
pnpm --filter @repo/cms generate:importmap
```

The CMS build already generates both Payload types and the import map before running `next build`.

## Quality checks

```bash
pnpm check
pnpm --filter @repo/cms build
pnpm --filter @repo/slides build
pnpm --filter @repo/web build
```

The full web build and Playwright suite require migrated, seeded PostgreSQL data. The public app uses Cache Components and Partial Prefetching, and its production `instant()` rig is documented in `instant-nav.rig.md`.

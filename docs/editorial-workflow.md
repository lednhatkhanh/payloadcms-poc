# Editorial workflow and demo accounts

This demo separates **country** from **language**:

- A country is a content tenant. Country accounts work only on content for their assigned country; global accounts work across every country.
- A language is the Payload locale selected in the CMS or public-site header. It changes localized copy without changing the selected country.

## Languages and countries

The public site has three language routes:

- `/en` — English, the default and source locale
- `/ja` — Japanese
- `/es` — Spanish

Unprefixed public links redirect to the visitor's most recently selected language; a first visit defaults to English. Localized content appears only when that exact language version exists. English is the source locale, so it is not selectable in a translation request.

Each country advertises the languages it supports:

| Country   | Code | Default language | Supported languages        |
| --------- | ---- | ---------------- | -------------------------- |
| Japan     | `JP` | Japanese         | English, Japanese          |
| Spain     | `ES` | Spanish          | English, Spanish           |
| Singapore | `SG` | English          | English, Japanese, Spanish |

Shared pages and the homepage remain global. News has a **Scope** field:

- **Global** news has no country and appears in every country view.
- **Country** news belongs to one country. A country account can work only on its own stories; a global account can work on every story.

The news index can be filtered by country. Country-story links keep that context, for example `/news/local-dispatch-update?country=JP`; global-story links remain `/news/example-slug`.

## Editorial flow

1. An editor creates or updates English content for the appropriate scope and country.
2. If a translation is needed, the editor selects a supported Japanese and/or Spanish locale in **Translation languages**, then chooses **Request translation**.
3. A translator completes the selected locale tabs and chooses **Submit translations for review**.
4. A reviewer approves the work or requests changes, optionally leaving a review note.
5. A publisher chooses **Publish changes** after approval.

The document toolbar controls workflow changes. The **Workflow state** field is read-only and records one of:

- Draft
- Translation requested
- In review
- Changes requested
- Approved for publishing

The CMS dashboard starts with **My requests**, a role-aware inbox:

- translators receive translation requests;
- reviewers receive items in review;
- editors receive requested changes;
- publishers receive approved items; and
- administrators see every active workflow request.

## Seeded demo accounts

All demo accounts use the password `Abc123@@`. These are local demonstration credentials only.

| Scope     | Role                                    | Name / email                                                                                                        |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Global    | Administrator                           | Alex Admin — `admin@dispatch.demo`                                                                                  |
| Global    | Editor                                  | Maya Global Editor — `editor@dispatch.demo`                                                                         |
| Japan     | Editor, translator, reviewer, publisher | `jp-editor@dispatch.demo`, `jp-translator@dispatch.demo`, `jp-reviewer@dispatch.demo`, `jp-publisher@dispatch.demo` |
| Spain     | Editor, translator, reviewer, publisher | `es-editor@dispatch.demo`, `es-translator@dispatch.demo`, `es-reviewer@dispatch.demo`, `es-publisher@dispatch.demo` |
| Singapore | Editor, translator, reviewer, publisher | `sg-editor@dispatch.demo`, `sg-translator@dispatch.demo`, `sg-reviewer@dispatch.demo`, `sg-publisher@dispatch.demo` |

The seed creates three published global stories. Each country also has two published local stories, one translation-requested draft, and one in-review draft. The repeated `local-dispatch-update` slug demonstrates that country news is identified by both its country and slug.

## Resetting demo content

After pulling schema or seed changes, migrate and reseed the local database:

```sh
pnpm db:migrate
pnpm seed
```

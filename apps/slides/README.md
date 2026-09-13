# CMS platform decision deck

- [Editable Google Slides](https://docs.google.com/presentation/d/1iL6dRuwJaBpfwgokHBY0m0AyClTgALUG6SGwGdc2BEM/edit)
- [Google Drive folder](https://drive.google.com/drive/folders/1z1GaczzVmVgBee44o5ouuxQXP_yxVGJE)
- [Canonical slide content](slides.md), [local styles](style.css), and [local PDF](cms-platform-decision.pdf)
- [Machine-readable companion configuration](google-slides.json)
- [Diagram sources and export conventions](../../docs/demo/diagrams/README.md)

The Google Slides companion contains native editable text and tables. Architecture diagrams and logos are images. Timeline tables remain editable. Source speaker notes and citations belong in the corresponding Google Slides notes.

## Updating the local deck

The repository's [presentation synchronization rule](../../AGENTS.md#presentation-synchronization) makes the local deck the default update target. Slide-related requests update the canonical source, affected referenced assets, speaker notes and local exports without modifying Google Slides unless the user explicitly requests remote synchronization. The local and remote versions may intentionally differ between synchronization requests.

1. Update the local source and any affected diagram exports or other referenced assets.
2. Regenerate the local PDF with `pnpm slides:export`.
3. Inspect the changed local slides for wrapping, clipping, alignment, spacing, contrast and image proportions. For a structural, global layout or slide-order change, inspect the complete local deck.

## Synchronizing Google Slides when requested

Only run this workflow when the user explicitly asks to update or synchronize the Google Slides companion in the current task. Update the existing presentation in place; keep its presentation ID and sharing settings.

1. Read the current local deck and a fresh Google Slides `get_presentation` response. Check for remote edits before applying changes; reconcile conflicts rather than overwriting them blindly.
2. Run `pnpm slides:google:prepare` to create a fresh content manifest with slide order, Markdown, notes, table cells and source/image hashes in `tmp/slides-google/source.json`.
3. Use the connected Google Drive / Google Slides tools to update the existing deck in place. Resolve slide, table and shape IDs from the fresh response. Preserve native text styles and table structure. Use the returned revision ID as `write_control.requiredRevisionId` where supported. Preserve image aspect ratios and replace affected diagram images using the local image upload mechanism.
4. Fetch a new, complete `get_presentation` response and save its JSON to `tmp/slides-google/readback.json`. Run `pnpm slides:google:check tmp/slides-google/readback.json` from the repository root. Review narrative body text and changed image content separately.
5. Render Google Slides as PDF or fetch fresh slide thumbnails. Check wrapping, clipping, spacing, alignment, color contrast, diagram proportions and content coverage. Repair issues in the same presentation, then check the repaired slides again. Inspect all slides after a structural or deck-wide change.
6. Run `pnpm check` before handoff. Report a blocked requested remote update explicitly, with the affected changes, if the connected account is unavailable. Do not mark the deck synchronized based only on a successful write or a local export.

## Saved tooling

```bash
# From the repository root; no database or Google credentials required
pnpm slides:google:prepare

# Check a fresh complete Google Slides API readback
pnpm slides:google:check tmp/slides-google/readback.json
```

[`scripts/google-slides.ts`](scripts/google-slides.ts) runs with the repository's Node.js 24 runtime and built-in modules. It resolves source paths relative to this app and reads the companion ID from `google-slides.json`. Generated manifests and remote readbacks stay in the ignored `tmp/slides-google/` directory.

The checker accepts either the presentation resource itself or its connector `structuredContent` / `result` wrapper. It checks the presentation ID, slide count, title order, native table cell contents, image counts and source notes. It exits unsuccessfully on a mismatch. It does not prove body-text equality, image identity, visual quality or that the readback is fresh. The manifest hashes describe the current local inputs; they are not a sync receipt.

The source extractor supports this deck's titled slides, pipe tables, HTML tables and local HTML image elements. Extend it when introducing other content formats, escaped pipe characters in table cells, Markdown images or untitled slides.

These commands prepare content and validate a supplied readback. Remote writes use the authenticated connector and are performed by the agent as part of the update workflow; there is no background sync or file watcher. No Google credentials are stored in the repository.

## Conversion and rendering notes

The initial conversion used an editable PowerPoint intermediate, followed by native Google Slides import and visual repairs. Future changes should edit the existing companion in place so its link, comments and sharing remain stable. The stock Slidev `export:pptx` command produces slide images and is unsuitable for replacing this editable companion.

When using the Google Drive connector:

- `get_presentation` and `batch_update_presentation` operate on the configured native presentation ID. Use `update_file` only for Drive metadata, not slide content.
- Local file import can fail with `source_file.mime_type` missing. The initial conversion succeeded by uploading the PPTX with an explicit MIME type, fetching the uploaded file with `download_raw_file: true` and `include_base64: false`, then passing the returned `file_uri` object to `import_presentation` with `upload_mode: "native_google_slides"`. This is a bootstrap procedure, not the ongoing sync method.
- The PDF rendering helper may receive a file reference without a materialized local path. In the initial conversion, its supported legacy inline response path was used to materialize the PDF. Fresh slide thumbnails also provide a direct-fetch `contentUrl` fallback. Keep temporary download URLs and file references out of committed files.
- Google expanded the initial budget table enough to touch its callout. Moving that table upward by 0.22 inches restored the gap. Recheck its current geometry after edits rather than replaying that offset repeatedly.

Keep the Noto Sans typeface, light theme and canonical ONE brand color. Use readable table headers and body text, retain source caveats and pending values, and give long titles and callouts enough room.

## Full review and synchronization, 13 September 2026

The companion now follows the 28-slide local deck, with a manager section on Slides 1–19 and technical detail on Slides 20–28. The review clarified recurring cost versus coexistence spending, added redirect and search acceptance checks, and made shared-service outage and recovery responsibilities explicit. The four-sprint POC and proposed availability target follow the current delivery plan.

Remote text remains native and editable, including all three tables. The logo and two architecture diagrams remain images. Source notes accompany every slide. Local browser and PDF inspection covered all 28 slides. Remote review corrected page-number wrapping, sprint labels, language labels, the estate count, cover wrapping, callout height and text placement.

The sync checker now extracts HTML table cells as well as Markdown pipe tables. Fresh readback and narrative comparison verified 354 text elements, three native tables, three images and all source notes. Temporary readbacks, source mappings and rendered review artifacts are under `tmp/slides-google/review/`.

## Local manager refinements, 13 September 2026

The latest local revision allocates eight people to the POC (4 developers, 2 QA, 1 PPO and 1 TA), replaces Slide 12 with a manager risk summary and makes the pending total CMS cost prominent on Slide 17. The deck remains 28 slides. These refinements are included in the verified synchronization recorded below; the full-review record above describes the preceding revision.

## Full pre-read and shorter local meeting

Keep `slides.md` and `cms-platform-decision.pdf` as the complete 28-slide pre-read. Present [meeting.md](meeting.md) for the shorter management meeting; it imports ten slides directly from the canonical source, without duplicating their content. The original slide numbers are retained as references into the pre-read.

Allow **20 minutes for the presentation, followed by 10 minutes of discussion**. Begin with the decision request; the full cover and extended benefit/technical material stay in the pre-read. Presenter notes on each selected source slide include the meeting position, suggested time and discussion cue.

| Meeting position | Pre-read slide | Purpose                               | Minutes |
| ---------------- | -------------- | ------------------------------------- | ------- |
| 1                | 3              | Decision requested now                | 1       |
| 2                | 4              | Current problem and expected benefits | 2       |
| 3                | 9              | Why Payload is preferred              | 2       |
| 4                | 12             | Risks and proposed responses          | 3       |
| 5                | 13             | Eight-person POC commitment           | 2       |
| 6                | 14             | Four-sprint evidence plan             | 2       |
| 7                | 15             | Implementation decision gates         | 2       |
| 8                | 16             | Migration and retirement sequence     | 2       |
| 9                | 17             | Pending total CMS cost                | 3       |
| 10               | 19             | Approval and next actions             | 1       |

```bash
pnpm --filter @repo/slides meeting:dev
pnpm --filter @repo/slides meeting:build
pnpm --filter @repo/slides meeting:export
```

The meeting PDF is `cms-platform-meeting.pdf`; its build uses `dist-meeting` so it does not replace the full deck build. Use the full pre-read for questions about editing benefits (Slides 6–8), vendor ownership (10), demo evidence (11), success measures (18) or technical design (20–28). Recheck the imported selection whenever the canonical slide order changes. This meeting route is local only.

## Verified manager refinements sync, 13 September 2026

Updated the existing 28-slide Google Slides companion in place with eight-person POC staffing, the four-risk summary with PICs to be agreed later, prominent pending total CMS cost, explicit engineering/editor benefits on Slide 4, and “Decide whether to proceed with implementation” on Slides 3 and 19. The ten-slide local meeting version imports the same source and both local PDFs were regenerated. Meeting-route cues are included in the companion's speaker notes; the companion remains the complete pre-read.

Fresh final readback verified all 28 slide titles/order, native table contents, image counts and source notes. Exact comparisons verified 36 changed text/notes elements. Three native tables, three images, slide IDs and the presentation ID were preserved; sharing was not modified. Fresh remote thumbnails were inspected for Slides 3, 4, 12, 13, 17 and 19. Repairs resolved the risk callout height/alignment and the closing approval-banner collision. The PDF helper could not materialize its file reference, so authenticated thumbnail URLs were used for visual verification. Evidence is under `tmp/slides-google/current/`.

Both local slide builds and exports passed. Repository formatting, lint and style checks passed; `pnpm check` remains blocked at web type generation by missing application environment variables.

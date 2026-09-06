# CMS platform decision deck

- [Editable Google Slides](https://docs.google.com/presentation/d/1iL6dRuwJaBpfwgokHBY0m0AyClTgALUG6SGwGdc2BEM/edit)
- [Google Drive folder](https://drive.google.com/drive/folders/1z1GaczzVmVgBee44o5ouuxQXP_yxVGJE)
- [Canonical slide content](slides.md), [local styles](style.css), and [local PDF](cms-platform-decision.pdf)
- [Machine-readable companion configuration](google-slides.json)
- [Diagram sources and export conventions](../../docs/demo/diagrams/README.md)

The Google Slides companion contains native editable text and tables. Architecture diagrams and logos are images. Timeline tables remain editable. Source speaker notes and citations belong in the corresponding Google Slides notes.

## Updating both versions

The repository's [presentation synchronization rule](../../AGENTS.md#presentation-synchronization) authorizes matching Google Slides updates whenever local slide content, order, notes, styles or referenced images change. Keep the existing presentation ID and sharing settings.

1. Read the current local deck and a fresh Google Slides `get_presentation` response. Check for remote edits before applying changes; reconcile conflicts rather than overwriting them blindly.
2. Update the local source and any affected diagram exports. Run `pnpm slides:google:prepare` to create a fresh content manifest with slide order, Markdown, notes, table cells and source/image hashes in `tmp/slides-google/source.json`.
3. Use the connected Google Drive / Google Slides tools to update the existing deck in place. Resolve slide, table and shape IDs from the fresh response. Preserve native text styles and table structure. Use the returned revision ID as `write_control.requiredRevisionId` where supported. Preserve image aspect ratios and replace affected diagram images using the local image upload mechanism.
4. Regenerate the local PDF with `pnpm slides:export`. Inspect changed local slides. For a global layout or slide-order change, inspect the complete deck.
5. Fetch a new, complete `get_presentation` response and save its JSON to `tmp/slides-google/readback.json`. Run `pnpm slides:google:check tmp/slides-google/readback.json` from the repository root. Review narrative body text and changed image content separately.
6. Render Google Slides as PDF or fetch fresh slide thumbnails. Check wrapping, clipping, spacing, alignment, color contrast, diagram proportions and content coverage. Repair issues in the same presentation, then check the repaired slides again. Inspect all slides after a structural or deck-wide change.
7. Run `pnpm check` before handoff. Report a blocked remote update explicitly, with the affected changes, if the connected account is unavailable. Do not mark the deck synchronized based only on a successful write or a local export.

## Saved tooling

```bash
# From the repository root; no database or Google credentials required
pnpm slides:google:prepare

# Check a fresh complete Google Slides API readback
pnpm slides:google:check tmp/slides-google/readback.json
```

[`scripts/google-slides.ts`](scripts/google-slides.ts) runs with the repository's Node.js 24 runtime and built-in modules. It resolves source paths relative to this app and reads the companion ID from `google-slides.json`. Generated manifests and remote readbacks stay in the ignored `tmp/slides-google/` directory.

The checker accepts either the presentation resource itself or its connector `structuredContent` / `result` wrapper. It checks the presentation ID, slide count, title order, native table cell contents, image counts and source notes. It exits unsuccessfully on a mismatch. It does not prove body-text equality, image identity, visual quality or that the readback is fresh. The manifest hashes describe the current local inputs; they are not a sync receipt.

The source extractor supports this deck's titled slides, pipe tables and local HTML image elements. Extend it when introducing other content formats, escaped pipe characters in table cells, Markdown images or untitled slides.

These commands prepare content and validate a supplied readback. Remote writes use the authenticated connector and are performed by the agent as part of the update workflow; there is no background sync or file watcher. No Google credentials are stored in the repository.

## Conversion and rendering notes

The initial conversion used an editable PowerPoint intermediate, followed by native Google Slides import and visual repairs. Future changes should edit the existing companion in place so its link, comments and sharing remain stable. The stock Slidev `export:pptx` command produces slide images and is unsuitable for replacing this editable companion.

When using the Google Drive connector:

- `get_presentation` and `batch_update_presentation` operate on the configured native presentation ID. Use `update_file` only for Drive metadata, not slide content.
- Local file import can fail with `source_file.mime_type` missing. The initial conversion succeeded by uploading the PPTX with an explicit MIME type, fetching the uploaded file with `download_raw_file: true` and `include_base64: false`, then passing the returned `file_uri` object to `import_presentation` with `upload_mode: "native_google_slides"`. This is a bootstrap procedure, not the ongoing sync method.
- The PDF rendering helper may receive a file reference without a materialized local path. In the initial conversion, its supported legacy inline response path was used to materialize the PDF. Fresh slide thumbnails also provide a direct-fetch `contentUrl` fallback. Keep temporary download URLs and file references out of committed files.
- Google expanded the initial budget table enough to touch its callout. Moving that table upward by 0.22 inches restored the gap. Recheck its current geometry after edits rather than replaying that offset repeatedly.

Keep the Noto Sans typeface, light theme and canonical ONE brand color. Use readable table headers and body text, retain source caveats and pending values, and give long titles and callouts enough room.

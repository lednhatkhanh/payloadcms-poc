# CMS platform decision deck: local optimization plan

Status: approved implementation brief for the next local slide revision

Scope: the local Slidev source, its local styling and its local PDF export. Do not update the Google Slides companion unless the user explicitly requests that in a later task.

This file is the authoritative brief for restructuring the presentation. `docs/demo/demo-plan.md` remains the authority for business decisions, facts and approved planning assumptions. `docs/demo/demo-slide-plan.md` must be updated during implementation so that its slide order matches the finished deck.

## Goal

Make the CMS platform proposal understandable to a reader who does not hear a presentation. Use simple, clear and focused English. Put a complete manager narrative first, then a separate technical narrative.

The target is 28 slides. The final count may move slightly only when visual review shows that another split or consolidation materially improves readability. Do not change the content scope merely to reach an exact number.

## Audience

- Primary: engineering managers and content managers deciding whether to approve the Payload proof of concept (POC).
- Secondary: platform, security and procurement stakeholders reviewing architecture, risk, Enterprise scope and cost.
- The first 19 slides must work as a standalone management read-ahead.
- Slides 20–28 must give technical readers enough context to understand the proposed design, unresolved questions and required evidence without presenter narration.

## Decisions and facts to preserve

- Request approval for the sequence Payload sales call → four-sprint Payload POC → separate implementation order, with one team allocated to the eight-week POC.
- Payload is the preferred candidate. Directus remains a fair comparison if the POC reveals a fundamental gap; it is not a parallel runtime or a second planned POC.
- The current estate is 26 country Drupal instances plus one global instance. The target is one logical CMS platform on ONE-managed GCP.
- Allocate eight people from Team A to the POC: 4 developers, 2 QA, 1 PPO and 1 TA. Team B continues current delivery. Implementation allocation is confirmed only after the POC.
- The implementation target is a provisional 18 months after POC acceptance and implementation approval. The POC is separate, so the consecutive elapsed scenario is about 20 months.
- The POC validates ONE-specific tenant, publishing, translation, form, Drupal import, access, quality and Enterprise requirements. Google SSO and GKE deployment are already proven or understood; demo familiarity and vendor documentation are starting evidence, not proof of complete production fit.
- POC import evidence covers representative news and iframe pages with required media and relationships. Complete implementation migration covers all agreed local/global pages and languages, news, iframe content and accepted form destinations.
- The POC gates remain use-case coverage, Drupal import, safe operation, a documented production-control and OTS evidence plan, zero open critical/high defects, team sign-off and documented Enterprise scope and CMS costs.
- The supplied Drupal/Acquia subtotal is USD 132,500 per year, or USD 265,000 for the next two years. Added GCP infrastructure remains a rough allowance of USD 6,000–13,800 per year, or USD 12,000–27,600 for two years. Payload Enterprise licence/support remains TBC. AI and development costs are excluded. Procurement must reconcile the supplied Drupal line items with its subtotal.
- Drupal costs continue during coexistence. Do not claim savings until equivalent current and target inputs are available. Savings can begin only as Drupal services and contracts retire.
- Preserve the proposed post-rollout measures: complete accepted migration across all 27 scopes, at least 80% editor readiness, an aim of 10% less publishing and reviewed-translation time, at least 97% annual CMS availability aligned with Unicorn, OTS SLA compliance, and lower running cost and maintenance effort.
- Preserve the seven supported languages and the distinction between country ownership and language.
- Preserve the existing ONE brand, Noto Sans, light theme, magenta palette, 16:9 canvas and architecture diagram assets.

Do not introduce unsupported delivery certainty, finalized savings, an approved licence purchase, measured productivity gains or claims that either vendor already meets every Enterprise requirement.

## Writing standards

- Lead with a concrete business benefit and explain the mechanism: one backlog and common releases; reusable development; one editor portal and practical publishing tools.
- Do not describe current organizational boundaries or imply a staffing reduction. Expected engineering gains must not become invented numerical savings.
- Distinguish available Payload features requiring setup from proven Google SSO, Enterprise workflow validation and future AI editing tools. MCP is an available integration foundation.
- Correct the prior Directus licence claim: v12 is source available under MSCL with four-year GPLv3 conversion; use current official sources, not the obsolete BSL pricing page.

- Give every slide one main message. Split a slide when two messages compete.
- Use direct titles that state the conclusion or question. Avoid presentation-dependent titles such as “Thank you for listening.”
- Define “proof of concept (POC)” at first use. Define technical platform terms where they first matter to a manager; keep unnecessary technical vocabulary out of Slides 1–19.
- Use short sentences, familiar verbs and concrete subjects. Prefer “ONE will test” to abstract phrases such as “validation will be undertaken.”
- Distinguish four evidence states consistently: current fact, vendor capability, ONE proposal and evidence still required.
- Put decision-critical qualifications on the slide. Use speaker notes for sources, calculations, detailed test conditions and secondary caveats.
- Keep Payload and Directus framing fair. Explain the recommendation through operating fit and validation needs rather than feature counts.
- Compare future-proofing through licensing, ownership, published adoption, roadmap influence and exit options. Treat company backing and customer references as signals, not proof of ONE fit.
- Avoid repeating the same caveat on several slides. Place each qualification where it changes the reader’s interpretation.

## Visual standards

- Use one dominant visual, comparison, timeline or table per slide.
- Prefer a flat top-to-bottom or left-to-right reading order over grids of small cards.
- Use approximately 20px or larger body text in the manager section and 17px or larger body text in the technical section. Do not solve crowding by shrinking below these targets.
- Limit manager slides to two or three visual groups. Replace the current six-card outcome grid with fewer, larger groups.
- Use short tables with clear headers. Move detailed assumptions and source lists into notes or the delivery plan.
- Give each section a distinct class: `manager-slide` for Slides 1–19 and `technical-slide` for Slides 20–28. Use the technical overview as a clear visual section break.
- Retain diagrams as images and keep their proportions. Add a short conclusion beside or below each diagram so it can be understood without narration.
- Preserve consistent footers, spacing and title positions. Remove one-off inline spacing when the same intent can be represented by a named local slide class.

## Target slide sequence

### Part 1: manager decision and delivery story

| Slide | Title                                                      |
| ----: | ---------------------------------------------------------- |
|     1 | One governed CMS platform for ONE                          |
|     2 | Switch to one CMS to simplify work and lower cost          |
|     3 | Start with a Payload sales call and an eight-week POC      |
|     4 | Twenty-seven Drupal stacks repeat cost and maintenance     |
|     5 | One platform connects decisions, delivery and publishing   |
|     6 | Decide once, build once, improve every site                |
|     7 | Give editors one place to work, preview and publish        |
|     8 | Make content easier to reuse, review and update            |
|     9 | Payload lets ONE build on its existing engineering skills  |
|    10 | Payload offers open-source ownership and a roadmap voice   |
|    11 | Build on the demo; test ONE’s remaining requirements       |
|    12 | Four risks to manage before rollout                        |
|    13 | Allocate eight people for an eight-week POC                |
|    14 | Four sprints produce reviewable evidence                   |
|    15 | Five gates protect the implementation decision             |
|    16 | Migration follows the POC in controlled waves              |
|    17 | Total new CMS cost pending Enterprise quote                |
|    18 | Success means complete migration and practical improvement |
|    19 | Take the next step toward a simpler CMS platform           |

### Part 2: technical design and evidence

| Slide | Title                                                      |
| ----: | ---------------------------------------------------------- |
|    20 | Technical design and validation                            |
|    21 | Next.js enables controlled CMS coexistence                 |
|    22 | Payload fits the existing GCP delivery platform            |
|    23 | Country ownership and language are separate controls       |
|    24 | Publishing needs governed workflow and extensibility       |
|    25 | Drupal migration needs repeatable import and cutover rules |
|    26 | Production readiness needs clear service controls          |
|    27 | Security and quality require explicit evidence             |
|    28 | MCP is available; AI-assisted editing remains planned      |

Slides 6–8 explain the proposed engineering and editor benefits. Slide 9 retains fair common ground and the Payload recommendation. Slide 10 compares current licensing, adoption and roadmap influence. Source notes carry technical setup details; decision-critical cost and availability qualifications remain visible.

## Mapping from the current 22 slides

| Current slide | Current title                                                   | Planned treatment                                                                                                                                                           |
| ------------: | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|             1 | One content platform on GCP                                     | Rewrite as Slide 1 with a benefit-led cover.                                                                                                                                |
|             2 | Approve a focused Payload POC                                   | Rewrite as Slide 3; summarize the business case on Slide 2.                                                                                                                 |
|             3 | Current delivery already combines Next.js and Drupal            | Retain the current-estate message on Slide 4; move coexistence detail to Slide 21.                                                                                          |
|             4 | Replace 27 separate CMS stacks with one governed platform       | Split the current problem and target operating model across Slides 4–5.                                                                                                     |
|             5 | Improve publishing without weakening engineering control        | Expand into Slides 6–8: engineering decisions, everyday editing, and collaboration/MCP.                                                                                     |
|             6 | Payload and Directus: the differences that matter               | Retain common ground and differences on Slide 9; add ownership and roadmap comparison on Slide 10.                                                                          |
|             7 | Payload fits the engineering model ONE already uses             | Merge into Slide 9, with the Payload recommendation and Directus strengths.                                                                                                 |
|             8 | A shared publishing workflow for country and global teams       | Expand manager value on Slides 7–8; retain technical controls on Slides 23–24.                                                                                              |
|             9 | Room for governed AI integration                                | Explain manager value on Slide 8 and technical boundaries on Slide 28.                                                                                                      |
|            10 | Target architecture on the existing GCP platform                | Retain as Slide 22; explicitly qualify the diagram's planned Enterprise AI features.                                                                                        |
|            11 | The POC tests ONE’s operating model on Payload                  | Retain demo evidence on Slide 11; consolidate manager risks and proposed responses, with PICs to be agreed later on Slide 12. POC tests remain covered by Slides 11 and 15. |
|            12 | Six-week POC target with two-week contingency                   | Rewrite as Slide 13 with four planned sprints and unchanged staffing.                                                                                                       |
|            13 | Three planned sprints, then contingency only if needed          | Rewrite as four planned two-week sprints on Slide 14.                                                                                                                       |
|            14 | POC gates for the implementation decision                       | Retain as Slide 15, with service-readiness wording aligned to the delivery plan.                                                                                            |
|            15 | Migrate in waves while Next.js serves both CMSs                 | Retain coexistence on Slide 21 and migration rules on Slide 25.                                                                                                             |
|            16 | Every content group needs an owner and an accepted destination  | Retain content coverage on Slide 25 and business ownership on Slide 16.                                                                                                     |
|            17 | An 18-month implementation target after the POC                 | Retain the separate 18-month implementation target on Slide 16.                                                                                                             |
|            18 | CMS budget: shared infrastructure and Enterprise licence        | Retain the two-year comparison on Slide 17; make the subtotal mismatch and exclusions visible.                                                                              |
|            19 | Platform success: complete migration and practical improvements | Retain outcome measures on Slide 18.                                                                                                                                        |
|            20 | Reliable service with clear technical measures                  | Retain production controls on Slides 26–27; GKE hosting is established.                                                                                                     |
|            21 | A technical discovery meeting with Payload sales                | Retain the sales → POC → implementation-order path on Slides 3 and 19; detailed questions on Slide 28.                                                                      |
|            22 | Thank you for listening                                         | Remove the presentation-dependent closing. Slide 28 ends with required answers and commercial outputs.                                                                      |

Every current topic is therefore retained, split, moved or explicitly removed. No current decision or evidence boundary is discarded.

## Implementation checklist

- [x] Rewrite `apps/slides/slides.md` into the manager and technical sections above.
- [x] Add manager and technical overview slides and remove the non-informative closing slide.
- [x] Preserve and update speaker notes, source links, cost assumptions and evidence qualifications.
- [x] Simplify `apps/slides/style.css` around the new hierarchy, larger type and flatter layouts; retain required diagram-specific rules.
- [x] Confirm that all referenced images load and that existing diagrams retain their aspect ratios.
- [x] Update `docs/demo/demo-slide-plan.md` with the final narrative, section boundary, slide titles and count.
- [x] Regenerate `apps/slides/cms-platform-decision.pdf` after the source and styles are final.
- [x] Keep `apps/slides/google-slides.json`, synchronization scripts and the remote Google Slides presentation unchanged.

## Standalone reading checks

Read Slides 1–19 without speaker notes. A manager must be able to explain:

- the burden created by the current 27-instance Drupal estate;
- what decision is requested now and what is not yet approved;
- why Payload is preferred and how Directus is treated fairly;
- what the demo already establishes and what the POC must prove;
- the POC team, prerequisites, duration, evidence and decision gates;
- how the provisional implementation, coexistence and Drupal retirement fit together;
- what cost inputs are known, unknown and excluded;
- how success will be measured and what decision follows the POC.

Read Slides 20–28 without speaker notes. A technical reader must be able to explain:

- the current and target architectures;
- how coexistence, ownership and rollback work;
- how country scope, language, workflow, permissions and forms relate;
- how Drupal data and dependencies are migrated and retired;
- what operational, recovery, security and quality evidence is required;
- which Enterprise, environment-promotion and AI questions remain open.

## Build and visual verification

1. Run `pnpm --filter @repo/slides build`.
2. Review every slide in the local browser at the 1280 × 720 Slidev canvas. This is mandatory because the change is structural and deck-wide.
3. Check titles, reading order, wrapping, clipping, alignment, spacing, contrast, table density, diagram proportions, footers and missing assets.
4. Correct slides that require text below the stated size targets by splitting or shortening content rather than shrinking it.
5. Repeat both standalone reading checks after the visual corrections.
6. Run `pnpm --filter @repo/slides export` and inspect every page of the regenerated PDF for the same layout problems and missing assets.
7. Confirm the final slide order and count in `docs/demo/demo-slide-plan.md`.
8. Run `pnpm check` and `git diff --check` before handoff.

The slide revision is complete only when the local build and PDF export pass, every slide has been visually inspected, both audiences pass the no-notes reading checks, documentation matches the deck, and no Google Slides content has been changed.

# CMS platform decision — presentation guide

**Audience:** Engineering and content managers first, followed by platform, security and procurement stakeholders.

**Decision:** Approve the sequence Payload sales call → four-sprint Payload proof of concept (POC) → separate implementation order. Allocate eight people to the eight-week POC. The provisional 18-month implementation target starts only after POC acceptance and approval.

**Source documents:** [Authoritative slide brief](../../PLAN.md) · [Management proposal](./demo-plan.md) · [Detailed delivery plan](./poc-delivery-plan.md) · [Slidev source](../../apps/slides/slides.md)

## Presentation approach

The 28-slide deck is a local read-ahead that works without a presenter. Slides 1–19 give managers a complete decision story. Slide 20 introduces the technical section; Slides 21–28 explain architecture, content controls, migration, operations and the remaining Enterprise questions.

Use simple English, one main message per slide and visible decision boundaries. Preserve ONE branding, Noto Sans, the date-free cover and the existing diagrams. Keep detailed sources, calculations and secondary qualifications in speaker notes. Google Slides synchronization is outside this local revision.

## Slide sequence

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

## Delivery points to preserve

- **Engineering value:** One shared backlog, clear decisions, reusable changes, common testing and releases reduce coordination and repeated long-term development and maintenance. Preserve staffing assumptions; describe expected gains without a promised speed multiplier.
- **Editor value:** One portal for authorized country/global content, Google SSO, drafts, autosave, Live Preview, version history, trash, scheduled publishing, reusable content and media, localization, advanced review/translation workflows, and MCP-assisted work. Distinguish configured demo features, available capabilities needing setup, Enterprise validation, and future AI tools.

- **Approval:** Team allocation and technical evaluation now; implementation, licence purchase and rollout follow a separate decision.
- **Estate:** 26 country Drupal instances plus one global instance. Language is independent of country ownership; seven languages are currently supported.
- **Recommendation:** Payload is preferred because it fits ONE’s TypeScript, React, Next.js and PostgreSQL engineering model. Its MIT-licensed core, Figma backing and explicit Enterprise roadmap influence are positive future-proofing signals. Directus remains a fair comparison with source-available MSCL terms for v12 and public feature-request channels; confirm Enterprise roadmap commitments if the POC reveals a fundamental required gap.
- **POC:** Four planned two-week sprints. Team A allocates eight people: 4 developers, 2 QA, 1 PPO and 1 TA; Team B continues existing delivery. The POC validates ONE-specific fit and has no real-user training or usability trial.
- **Gates:** Use-case coverage, representative Drupal import, safe operation, a documented production-control and OTS evidence plan, no open critical/high defects, team sign-off and documented Enterprise scope and CMS costs.
- **Implementation:** A provisional 18 months after POC acceptance and implementation approval. About 20 months if consecutive; approval and procurement gaps can extend the sequence.
- **Migration:** All accepted local/global pages and languages, news, iframe content and form destinations. One authoritative CMS per route/item during coexistence; accepted migration and removal of Drupal dependencies precede retirement.
- **Capabilities:** Google SSO is proven and benefits editors and developers. Live Preview and the official Multi-Tenant and MCP plugins are available foundations. Validate advanced publishing and translation workflows with Payload Enterprise. AI-assisted translation, writing and image features remain roadmap-dependent.
- **Risks:** Slide 12 consolidates migration complexity, Enterprise fit and cost, country ownership and shared-platform outages, with proposed responses spanning POC and implementation. PICs will be agreed later; the proposed POC scope remains unchanged and no pre-kickoff PIC assignment is required.
- **Cost:** Make the pending total new CMS cost as prominent as the infrastructure figures. Compare the supplied Drupal/Acquia baseline of USD 265,000 for two years with USD 12,000–27,600 of added GCP infrastructure plus Payload Enterprise TBC. AI and development are excluded. Drupal costs continue during coexistence, and procurement must reconcile the supplied Drupal line items with the stated subtotal.
- **Success:** Complete accepted migration across all 27 scopes, at least 80% editor readiness, an aim of 10% less publishing and reviewed-translation time, at least 97% annual CMS availability aligned with Unicorn, OTS SLA compliance, and lower running cost and maintenance effort.

## Reading and visual checks

Read Slides 1–19 without notes and confirm that the decision, rationale, recommendation, future-proofing, POC, provisional rollout, cost model, success measures and next decision are clear. Read Slides 20–28 without notes and confirm that the architecture, content controls, migration rules, service controls and unresolved Enterprise questions are clear.

Inspect every slide at the 1280 × 720 canvas and in the regenerated PDF. Check wrapping, clipping, alignment, spacing, contrast, table density, diagram proportions and missing assets. Do not reduce manager body text below approximately 20px or technical body text below approximately 17px to solve crowding; shorten or split content instead.

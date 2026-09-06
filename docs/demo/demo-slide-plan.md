# CMS platform decision — presentation guide

**Audience:** Engineering and content managers, with platform/security and procurement stakeholders.

**Decision:** Approve the technical vendor meeting and one dedicated team for a six-week Payload POC target, with up to two additional weeks for unresolved validation or vendor dependencies. Implementation follows a separate gate review and approval; its provisional 18-month target excludes the POC.

**Source documents:** [Management proposal](./demo-plan.md) · [Detailed delivery plan](./poc-delivery-plan.md) · [Slidev source](../../apps/slides/slides.md)

## Presentation approach

Use 22 slides for about 25–30 minutes plus discussion. Open with the requested commitment, explain the current burden and candidate choice, then present the POC and full migration as separate stages. End with the technical meeting and implementation decision. Keep TBC inputs visible for later completion; do not turn them into repeated caveats.

Preserve ONE branding, Noto Sans, the date-free cover and the existing architecture diagrams. Keep both the POC and implementation schedules as native editable slide tables. Use the technical notes for questions, not as additional management slides. The proposal provides a concise read-ahead; the delivery plan holds sample definitions, sprint responsibilities and cost assumptions.

## Slide sequence

| Slide | Title                                                           |
| ----- | --------------------------------------------------------------- |
| 1     | One content platform on GCP                                     |
| 2     | Approve a focused Payload POC                                   |
| 3     | Current delivery already combines Next.js and Drupal            |
| 4     | Replace 27 separate CMS stacks with one governed platform       |
| 5     | Improve publishing without weakening engineering control        |
| 6     | Payload and Directus: the differences that matter               |
| 7     | Payload fits the engineering model ONE already uses             |
| 8     | A shared publishing workflow for country and global teams       |
| 9     | Room for governed AI integration                                |
| 10    | Target architecture on the existing GCP platform                |
| 11    | The POC tests ONE’s operating model on Payload                  |
| 12    | Six-week POC target with two-week contingency                   |
| 13    | Three planned sprints, then contingency only if needed          |
| 14    | POC gates for the implementation decision                       |
| 15    | Migrate in waves while Next.js serves both CMSs                 |
| 16    | Every content group needs an owner and an accepted destination  |
| 17    | An 18-month implementation target after the POC                 |
| 18    | CMS budget: shared infrastructure and Enterprise licence        |
| 19    | Platform success: complete migration and practical improvements |
| 20    | Reliable service with clear technical measures                  |
| 21    | A technical discovery meeting with Payload sales                |
| 22    | Thank you for listening                                         |

## Delivery points to preserve

- **Approval:** Team allocation and technical evaluation now; implementation, licence purchase and full rollout follow a separate decision.
- **Estate:** 26 country Drupal instances plus one global instance. Language is independent of country ownership. Existing language scope: English, Chinese, Japanese, Korean, Spanish, Portuguese and French.
- **Team:** Each team has 6 developers, 2 QA, 1 PPO and 1 TA. Team A runs the POC; Team B continues existing delivery. PO provides higher-level direction outside the team count.
- **POC:** Three two-week sprints and an optional contingency sprint with AI Agent support. PPO confirms flows; no real-user training or usability trial. Drupal import evidence covers news and iframe pages with required media/relationships. Environment promotion is exploratory and outside the gates.
- **Gates:** Use-case coverage, Drupal import, safe operation, OTS SLA compliance, zero open critical/high defects, team sign-off and documented Enterprise scope/CMS costs. Keep the slide qualitative.
- **Implementation:** Eighteen months after POC acceptance and implementation approval. Show engineering and content workstreams, including real-user training. About 19.5–20 months if consecutive; the overall forecast remains provisional.
- **Migration:** All local/global pages and required languages, all news, iframe content and business-selected form destinations. One authoritative owner per route/item during coexistence. Full accepted migration and removal of Drupal dependencies precede shutdown.
- **Cost:** Incremental infrastructure plus Enterprise licence/support (TBC). AI and development costs excluded. Existing GKE/Cloudflare reuse does not eliminate added capacity costs. Drupal costs continue during coexistence; lower cost and maintenance remain the objective.
- **Success:** Preserve 100% Drupal migration. Proposed targets: 80% editor readiness, 10% publishing/translation improvement and 99% annual availability. OTS recovery SLA remains 4.5 hours, without recovery sub-targets on slides.
- **Technical meeting:** TA/PPO questions with Payload sales and a solutions engineer. Cover cost, Enterprise depth, tenancy, migration, sync, operations and AI data handling. Seek written actions, trial access and a quote or due date; any AI pricing is separate.

## Evidence language

The demo provides familiarity, vendor documentation describes capabilities, and the POC proves ONE-specific fit. Do not state that either candidate already satisfies every enterprise requirement or that the official Form Builder automatically provides ONE’s complete frontend experience.

The AI page checked on 6 September 2026 labels writing assistance and image generation “Coming Soon”. Keep room for integration through plugins and MCP, with AI costs calculated separately. Full experimentation and optional AI extensions must not displace the required POC evidence.

Architecture uses one generic CMS component. Directus is a comparison candidate, not a fallback runtime. Retain TBC Drupal and Enterprise inputs until supplied; avoid savings percentages before equivalent cost inputs are available.

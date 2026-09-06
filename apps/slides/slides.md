---
theme: default
title: One content platform on GCP
author: ONE
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: fade
download: false
exportFilename: cms-platform-decision
fonts:
  provider: none
layout: cover
class: cover-slide
hideInToc: true
defaults:
  layout: default
  transition: fade
---

<img class="one-logo" src="/one-logo.svg" alt="Ocean Network Express" />

# One content platform on GCP

<div class="cover-subtitle">A decision framework for replacing 27 Drupal sites with one governed content platform</div>

<div class="cover-meta">Decision proposal</div>

<!--
We are choosing an operating model for the next several years, not merely comparing feature lists.

The management story is: why change, what both candidates can do, why Payload fits ONE better, and how migration and the planned PoC reduce implementation risk.
-->

---

<div class="eyebrow">Decision requested</div>

# Approve a focused Payload POC

| Decision | Proposal |
| --- | --- |
| Direction | Evaluate Payload as the preferred replacement for 27 Drupal instances |
| Commitment now | One team for six weeks, with up to two additional weeks for unresolved gaps; a technical meeting with Payload sales and a solutions engineer |
| POC evidence | ONE’s use cases, Drupal news/iframe imports, safe operation and OTS SLA compliance |
| Decision afterwards | Approve implementation after gate review, with Enterprise scope and CMS costs documented |

<div class="callout soft">Expected outcome: lower CMS running cost and maintenance effort, with more consistent publishing.</div>

<div class="callout">The provisional 18-month implementation target starts after the POC and implementation approval.</div>

<!--
This approval covers the technical vendor discussion and allocation of Team A once trial access, Drupal data and GCP access are ready. It does not approve a licence purchase or the full rollout. TBC commercial inputs remain placeholders until supplied. Team B continues existing delivery during the POC.
-->

---

<div class="eyebrow">Why change · Current architecture</div>

# Current delivery already combines Next.js and Drupal

<img class="diagram-image current-context" src="/diagrams/current-platform-context.png" alt="Current CMS delivery context showing Next.js connecting directly across the GCP and Acquia boundary to Drupal" />

<!--
This is a management abstraction of the supplied architecture. Apigee and the unrelated external API remain outside the CMS delivery view.

The important point is that mixed delivery already exists. Migration can therefore move route ownership gradually rather than wait for one large cutover.
-->

---

<div class="eyebrow">Why change · Operating model</div>

# Replace 27 separate CMS stacks with one governed platform

<div class="operating-model">
  <div class="model-side current-model">
    <div class="model-number">27×</div>
    <h2>Current estate</h2>
    <div class="model-line"><strong>Runtime</strong><span>26 country instances + 1 global instance</span></div>
    <div class="model-line"><strong>Change</strong><span>Repeated patches, releases, and testing</span></div>
    <div class="model-line"><strong>Cost</strong><span>Acquia + Drupal + Varnish + cross-cloud work</span></div>
    <div class="model-line"><strong>Data</strong><span>Reuse and reporting across isolated databases</span></div>
  </div>
  <div class="model-arrow"><span>centralize governance</span>→</div>
  <div class="model-side target-model">
    <div class="model-number">1</div>
    <h2>Target platform</h2>
    <div class="model-line"><strong>Runtime</strong><span>One logical CMS on GCP</span></div>
    <div class="model-line"><strong>Change</strong><span>Shared deployment and regression controls</span></div>
    <div class="model-line"><strong>Cost</strong><span>GCP + Enterprise licence / support</span></div>
    <div class="model-line"><strong>Data</strong><span>Country policy + shared global content</span></div>
  </div>
</div>

<div class="callout soft">The business case comes from retiring repeated platform work across 27 stacks.</div>

<!--
The transition temporarily costs more because both platforms run in parallel. Do not show a saving until finance validates current and target inputs.

[Sources]
- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer
- https://www.drupal.org/docs/administering-a-drupal-site/configuration-management/managing-your-sites-configuration
-->

---

<div class="eyebrow">Decision frame · Required outcomes</div>

# Improve publishing without weakening engineering control

<div class="columns-6">
  <div class="panel number-panel"><div class="number">01</div><h2>Platform ownership</h2><p>GCP, PostgreSQL, GCS, backup, and restore.</p></div>
  <div class="panel number-panel"><div class="number">02</div><h2>Global publishing</h2><p>26 country sites, one global site, seven languages, and scoped access.</p></div>
  <div class="panel number-panel"><div class="number">03</div><h2>Editorial control</h2><p>Preview, review, approval, scheduling, and translation state.</p></div>
  <div class="panel number-panel"><div class="number">04</div><h2>Structured experience</h2><p>Approved blocks and rich text, not arbitrary styling.</p></div>
  <div class="panel number-panel"><div class="number">05</div><h2>Digital operations</h2><p>Forms, SEO, audit, observability, and environment promotion.</p></div>
  <div class="panel number-panel"><div class="number">06</div><h2>Controlled transition</h2><p>Drupal coexistence, Enterprise support and room for AI integration.</p></div>
</div>

<div class="callout soft">These six outcomes define the minimum acceptable platform.</div>

---

<div class="eyebrow">Candidate comparison · Meaningful differences</div>

# Payload and Directus: the differences that matter

<div class="columns-2">
  <div class="panel"><h2>Shared starting point</h2><p>Self-hosted content platforms with APIs, access controls and extensibility. ONE’s tenant and workflow fit still needs validation.</p></div>
  <div class="panel"><h2>Payload advantage</h2><p>React and TypeScript alignment, official forms and multi-tenant plugins, code-first extensions, and an MIT-licensed core.</p></div>
  <div class="panel"><h2>Directus advantage</h2><p>Schema/configuration sync, Studio automation and Flows, broad data-platform flexibility, and existing internal familiarity.</p></div>
  <div class="panel"><h2>Evidence still required</h2><p>ONE’s tenant model, Enterprise workflows, Drupal imports, operations, support and CMS costs.</p></div>
</div>

<div class="callout">Payload is the preferred candidate; Directus remains the comparison if the POC reveals a fundamental gap.</div>

<!--
Avoid a feature-count or scorecard debate. Do not present ONE-specific implementation fit as already proven. The decision rests on the combined operating consequences.

[Sources]
- https://payloadcms.com/enterprise
- https://payloadcms.com/enterprise/publishing-workflows
- https://payloadcms.com/enterprise/headless-ab-variant-testing
- https://payloadcms.com/enterprise/enterprise-ai
- https://directus.com/enterprise
- https://directus.com/resources/12.3-release-notes
- https://directus.com/docs/guides/ai
-->

---

<div class="eyebrow">Recommendation · Why Payload</div>

# Payload fits the engineering model ONE already uses

<div class="columns-3">
  <div class="panel"><h2>Familiar stack</h2><p>TypeScript, React, Next.js and PostgreSQL align with our application skills and AI-assisted development approach.</p></div>
  <div class="panel"><h2>Extensible platform</h2><p>Official plugins provide forms and multi-tenancy. Custom plugins can handle ONE-specific integrations and migration needs.</p></div>
  <div class="panel"><h2>Shared operations</h2><p>Reuse GKE and Cloudflare, own the database and media, and maintain one governed CMS platform.</p></div>
</div>

<div class="callout soft">The POC must prove use-case coverage and operational fit. Enterprise features require hands-on confirmation.</div>

<!--
This recommendation builds on the existing demo and the documented comparison. Code-first alignment is a fit judgment, not a measured delivery saving. The official Form Builder provides a foundation; ONE still builds and validates its frontend and submission integrations. Exact Enterprise feature scope remains part of the technical vendor meeting.
Sources: https://payloadcms.com/docs/plugins/overview ; https://payloadcms.com/docs/plugins/build-your-own ; https://payloadcms.com/docs/plugins/plugin-api
-->

---

<div class="eyebrow">Content value · Global publishing</div>

# A shared publishing workflow for country and global teams

<div class="scope-language-summary">
  <div class="scope-summary"><strong>27</strong><span>site scopes</span><p>26 country sites + 1 global site</p></div>
  <div class="language-summary"><strong>7 supported languages</strong><div class="language-chips"><span>English</span><span>Chinese</span><span>Japanese</span><span>Korean</span><span>Spanish</span><span>Portuguese</span><span>French</span></div></div>
</div>

<div class="flow" style="margin-top: 24px">
  <div class="step"><strong>Write</strong><span>Create within approved blocks and fields</span></div>
  <div class="step"><strong>Preview</strong><span>See the actual Next.js experience while editing</span></div>
  <div class="step"><strong>Review + translate</strong><span>Visible status, feedback, and role-based transitions</span></div>
  <div class="step"><strong>Publish</strong><span>Approve, schedule, and publish with accountability</span></div>
</div>

<div class="callout soft">Country defines ownership and access. Language is a separate publishing choice.</div>

<!--
Examples do not prescribe which languages every country publishes. The seven supported languages are English, Chinese, Japanese, Korean, Spanish, Portuguese, and French.

[Sources]
- https://payloadcms.com/docs/plugins/multi-tenant
- https://payloadcms.com/docs/configuration/localization
- https://payloadcms.com/docs/live-preview/overview
- https://payloadcms.com/enterprise/publishing-workflows
-->

---


<div class="eyebrow">Content value · Enterprise AI</div>

# Room for governed AI integration

<div class="columns-3">
  <div class="panel"><h2>Writers + translators</h2><p>AI translation with human review; writing and image tools remain subject to release confirmation.</p></div>
  <div class="panel"><h2>Editors + content operations</h2><p>Brand prompts, glossaries, structured-content checks, permissions, and reusable governance.</p></div>
  <div class="panel"><h2>Developers</h2><p>Approved tools can work with CMS schemas and content through permission-scoped MCP connections.</p></div>
</div>

<div class="ai-platforms">
  <div><span class="pill">Payload Enterprise</span><p>AI translation, permissions, and MCP. The AI page marks image generation and writing assistance “Coming Soon”.</p></div>
  <div><span class="pill">Directus Enterprise</span><p>Studio Assistant, multi-language translation, custom models, and MCP for editors and developers.</p></div>
</div>

<div class="callout soft">Room for AI integration through plugins and MCP. AI costs will be calculated separately from the CMS budget.</div>

<!--
Both candidates provide credible AI. Require the same writing, translation, permissions, tenant isolation, audit, cost control, and human approval demonstrations. AI integration, optional AI add-ons and provider usage are outside the CMS budget; estimate them separately for agreed use cases and volumes.

[Sources]
- https://payloadcms.com/enterprise/enterprise-ai
- https://payloadcms.com/enterprise/ai-framework
- https://payloadcms.com/docs/plugins/mcp
- https://directus.com/docs/guides/ai
- https://directus.com/docs/guides/ai/translations
- https://directus.com/docs/guides/ai/mcp
-->

---

<div class="eyebrow">Platform model · Target architecture</div>

# Target architecture on the existing GCP platform

<img class="diagram-image target-architecture" src="/diagrams/target-cms-gcp.png" alt="Vendor-neutral target CMS architecture on Google Cloud Platform" />

<div class="callout soft">Reuse the existing GKE cluster and Cloudflare project; add Cloud SQL and a dedicated GCS bucket.</div>

<!--
The diagram is vendor-neutral. Payload and Directus are compared against the same GCP target. A separate model provider is a later option only for a confirmed gap.

[Sources]
- https://payloadcms.com/docs/production/deployment
- https://payloadcms.com/docs/upload/storage-adapters
- https://docs.directus.io/self-hosted/config-options
- https://docs.cloud.google.com/sql/docs/postgres/configure-ha
-->

---



<div class="eyebrow">POC · Known foundations and remaining risks</div>

# The POC tests ONE’s operating model on Payload

| Already understood from the demo and documentation | POC focus |
| --- | --- |
| Code-first CMS; TypeScript, Next.js and PostgreSQL fit | Actual global/country ownership, shared content and access rules |
| Official Multi-Tenant and Form Builder plugins | Real tenant isolation and a representative business form |
| Self-hosting on GCP / GKE is feasible | Recovery, performance and operations in ONE’s shared cluster |
| Official and custom plugin extension model | Import news and iframe pages from Drupal; explore environment promotion separately |
| Enterprise workflow and AI portfolio is advertised | PPO confirmation of required publishing and translation flows; assess available AI |

<div class="callout soft">Build on the demo. Prove the remaining risks with real Drupal data and PPO flow confirmation.</div>

<!--
Demo familiarity does not prove estate-wide fit. Forms are supported by an official plugin, not an assumption that every business form works out of the box. AI Agent support is an engineering approach, not a guaranteed productivity multiplier.
Sources: https://payloadcms.com/docs/plugins/overview ; https://payloadcms.com/docs/plugins/build-your-own ; https://payloadcms.com/docs/plugins/plugin-api ; https://payloadcms.com/enterprise/publishing-workflows ; https://payloadcms.com/enterprise/enterprise-ai
-->

---

<div class="eyebrow">POC · Team and delivery commitment</div>

# Six-week POC target with two-week contingency

<div class="columns-2">
  <div class="panel"><h2>Team A · POC</h2><p>Developers pair across tenant/workflow, Drupal imports, and platform/integration work. QA validates continuously; PPO owns acceptance; TA owns architecture.</p></div>
  <div class="panel"><h2>Team B · Existing delivery</h2><p>Continues current delivery during the POC. Proposed implementation split: Team A owns the platform; Team B owns website integration and migration.</p></div>
</div>

<div class="callout soft">3 × two-week sprints with AI Agent support; up to 2 extra weeks only for unresolved validation or vendor dependencies.</div>

<div class="callout">PO provides higher-level direction and approvals outside the teams.</div>

<!--
PPO owns the team backlog and flow acceptance. PO provides higher-level product direction and decisions outside the teams. Before week 1, secure Drupal extracts, Enterprise trial and GCP access. There is no real-user training or usability trial in the POC. Platform/security and procurement provide shared support. Content creators join during implementation. No assumption that AI removes QA, review or vendor lead times. Both teams' implementation allocation requires portfolio agreement after the POC.
-->

---

<div class="eyebrow">POC · Detailed timeline</div>

# Three planned sprints, then contingency only if needed

| Workstream | Sprint 1 · Weeks 1–2 | Sprint 2 · Weeks 3–4 | Sprint 3 · Weeks 5–6 |
| --- | --- | --- | --- |
| **Engineering + QA** | Confirm tenant rules; profile Drupal samples; verify Enterprise access | Import news and iframe pages; rerun checks; publishing and form flows | Operational rehearsals; resolve defects; review gates and costs |
| **PPO validation** | Confirm use cases and expected outcomes | Confirm imports, translation and form flows | Confirm end-to-end flows and gate evidence |
| **Sprint exit** | Access matrix and sample agreed | Import evidence and PPO-confirmed flows | **Week 6: go / no-go review** |

<div class="callout soft">Optional · Weeks 7–8: resolve named validation or vendor gaps, recheck affected flows and close remaining gates. No additional scope.</div>

Close the POC as soon as its gates are met. No real-user training during the POC.

<!--
The optional fourth sprint addresses specific unresolved validation or vendor dependencies, with an owner and completion date; it does not add scope. PPO confirms flows, with no real-user training during the POC. POC migration covers news and iframe pages with their media and relationships. Environment promotion remains exploratory work, outside the defined migration acceptance metric. Detailed sample sizes, owners, entry criteria and decision gates are in docs/demo/poc-delivery-plan.md. Enterprise access must be ready early; unavailable capabilities are gaps, not a pass. No real-user training, onboarding or timed end-user trials in the POC.
-->

---

<div class="eyebrow">POC · Decision gates</div>

# POC gates for the implementation decision

| Gate | Evidence required |
| --- | --- |
| Use-case coverage | Payload covers ONE’s agreed tenant, publishing, translation and form use cases; PPO confirms the flows |
| Drupal import | Demonstrate the ability to import news and iframe pages from Drupal, including required media and relationships |
| Safe operation | Validate tenant access, approval controls and protection of unpublished content |
| Operations and recovery | Meet the OTS SLA |
| Quality and decision readiness | Zero open critical/high defects; PPO, TA and QA sign-off; Enterprise scope and CMS costs documented |

<div class="callout soft">Proceed when the gates are met. Unresolved required capabilities need an explicit scope, extension or no-go decision.</div>

<!--
POC gates are qualitative acceptance decisions, not percentage targets. Migration evidence covers news and iframe pages; environment sync is outside these gates. PPO confirms flows; real-user training and productivity measurement belong to implementation. OTS recovery SLA remains 4.5 hours, as documented in the delivery plan. CMS costs include infrastructure and Enterprise licence; AI costs are calculated separately.
-->

---

<div class="eyebrow">Transition · Controlled migration</div>

# Migrate in waves while Next.js serves both CMSs

<img class="diagram-image migration-architecture" src="/diagrams/drupal-coexistence-migration.png" alt="Next.js dual-source routing with Payload, Drupal adapters, tracked iframes, and per-wave connection retirement" />

<div class="callout soft">One owner per route or item · route-level rollback · retire each Drupal connection after its wave is accepted</div>

<!--
Pages move route by route, news moves in repeatable collection waves, and forms move after end-to-end behavior passes. Existing iframe routes can remain a temporary bridge. Selective deltas and reconciliation are only needed for content that continues changing during coexistence.

[Sources]
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- https://payloadcms.com/docs/rest-api/overview
-->


---

<div class="eyebrow">Transition · Complete migration scope</div>

# Every content group needs an owner and an accepted destination

| Content group | Migration approach and business responsibility |
| --- | --- |
| All local and global pages | Migrate layouts, content, media and every required language; country/global owners approve |
| All news | Import from Drupal, preserve dates and relationships; reconcile final changes before cutover |
| Drupal iframe pages | Import underlying content and assets; rebuild required behavior; remove Drupal-hosted iframe dependencies |
| Forms | Business chooses migrate, rebuild or centralize per form; validate submissions, consent, routing and retention |

<div class="callout soft">During coexistence, new content goes to Payload as each destination becomes ready. Existing Drupal content migrates in waves.</div>

<!--
Any temporary new-content exception requires a named owner and a migration date. Each route/item has one authoritative CMS. Changes to existing Drupal-owned content use one-way deltas until accepted cutover; never edit the same item in both CMSs. Form inventory and business decisions belong in early planning. Shutdown requires all content accepted and no remaining Drupal runtime dependencies.
-->

---

<div class="eyebrow">Delivery · Provisional overall timeline</div>

# An 18-month implementation target after the POC

**Separate POC: 6 weeks + up to 2 optional weeks → acceptance and approval → implementation month 1**

| Phase | Engineering | Content creators + business |
| --- | --- | --- |
| **Months 1–3 · Foundation** | Platform foundation and integrations | Content inventory, cleanup and form decisions |
| **Months 4–6 · Pilot** | Pilot launch; begin coexistence | Train pilot editors; user acceptance |
| **Months 7–12 · Migration** | Main page and news migration waves | Review languages; approve each wave |
| **Months 13–15 · Remaining scope** | Remaining iframe content and forms | Accept remaining content and forms |
| **Months 16–18 · Retirement** | Final migration deltas; retire Drupal | Final content sign-off and archive approval |

<div class="callout soft">Provisional: confirm team allocation, content-review capacity and form decisions after the POC. About 19.5–20 months including the separate POC, if consecutive.</div>

<!--
Implementation months 1–3 foundations and inventory; 4–6 pilot and real-user training; 7–12 main migrations; 13–15 remaining scope; 16–18 stabilization and retirement. Content creators participate during implementation. Approval/procurement gaps can extend elapsed time. Rebaseline after the POC; content acceptance and contract notice periods determine actual retirement.
-->

---

<div class="eyebrow">Budget · Infrastructure and Enterprise licence</div>

# CMS budget: shared infrastructure and Enterprise licence

| Monthly cost · USD, rough planning allowance | Current Drupal / Acquia | New CMS increment |
| --- | --- | --- |
| Hosting / compute | Pending Monday cost breakdown | Existing GKE cluster: $0–200 added capacity |
| Database | Pending | Cloud SQL PostgreSQL HA, 2 vCPU / 8 GiB, 100 GiB SSD: $300–500 |
| Assets | Pending | New GCS bucket, assumed 100 GiB: $5–20 storage / operations |
| Edge, telemetry, backup and network allowance | Pending | Existing Cloudflare project + usage allowance: $50–150 |
| Shared DEV / STAGE allowance | Pending | $100–250 |
| **Infrastructure subtotal** | **TBD · Monday input** | **About $500–1,150 / month · $6,000–13,800 / year** |
| CMS licence / support | Included scope to confirm | **Payload Enterprise: TBC** |

<div class="callout soft">CMS budget = added infrastructure + Enterprise licence (TBC). AI and development costs are excluded.</div>

<div class="callout">Drupal costs continue during coexistence. Savings start as its services and contracts retire.</div>

<!--
Rounded subtotal from $455–1,120/month. USD before tax, no committed-use discounts. Singapore is a provisional region; 730 hours/month. 100 GiB provisioned DB capacity approximates the requested 100 GB planning case, not measured usage or a sizing result. GCS size is a separate assumption. Cloud SQL allowance includes HA compute/storage; backup is in the usage row. Existing GKE/Cloudflare base bills stay allocated to the current app; incremental capacity is not automatically free. DEV/STAGE shared and non-HA assumption needs validation. Detailed assumptions and sources: docs/demo/poc-delivery-plan.md.
Sources checked 6 September 2026: https://cloud.google.com/sql/pricing ; https://cloud.google.com/sql ; https://cloud.google.com/storage/pricing
The platform leaves room for AI integration; integration, optional add-ons and usage costs will be calculated separately and are excluded from this CMS budget. Ask the vendor to separate optional AI charges from the Enterprise CMS quote. During coexistence, retain Drupal costs and add the new CMS costs. Compare equivalent infrastructure and licence/support scope when the planned inputs arrive. The comparison uses incremental GCP costs because the existing app infrastructure remains; do not treat shared platform capacity as unlimited.
-->

---

<div class="eyebrow">Platform · Outcomes after rollout</div>

# Platform success: complete migration and practical improvements

| Measure | Proposed platform target |
| --- | --- |
| Drupal retirement | 100% of agreed Drupal content migrated and accepted across all 27 site scopes; no Drupal dependencies by implementation month 18 |
| Editor readiness | At least 80% of active editors trained and able to complete core publishing tasks |
| Publishing efficiency | Aim for 10% less publishing and reviewed translation time, without reducing content quality |
| Service reliability | At least 99% annual CMS availability; operations and recovery meet the OTS SLA |
| Cost and maintenance | Lower CMS running cost and maintenance effort than the current Drupal estate |

<div class="callout soft">Confirm improvement targets against the Drupal baseline during implementation; review results after each rollout wave.</div>

<!--
Full Drupal migration and retirement remain required. Editorial and efficiency targets are proposed, not achieved. Count editors who are both trained and able to complete core tasks. Compare median publishing and reviewed translation times for comparable content and language cohorts. CMS budget excludes AI and development costs; document actual costs and maintenance effort. Availability includes planned downtime. Retirement still requires content acceptance and removal of live Drupal dependencies.
-->

---

<div class="eyebrow">Platform · Technical service measures</div>

# Reliable service with clear technical measures

| Area | Target or review criterion | Measurement |
| --- | --- | --- |
| Availability | At least 99% annual CMS and public-delivery availability | Measure each service annually, including planned downtime |
| Security | No open critical/high findings; tenant and draft access controls verified | Security scans and access tests before release |
| Speed | Public delivery and editor actions perform at least as well as the agreed baseline | Response times and errors under representative load |
| Content freshness | Approved content appears correctly on the site and in search | Publish-to-visible checks |
| Operations and recovery | Meet the OTS SLA | Confirm SLA compliance |

<div class="callout soft">Set detailed performance targets during implementation using actual traffic, content volume and platform capacity.</div>

<!--
These are production service measures, not additional numerical POC gates. Measure availability including planned downtime, response-time percentiles, request errors and publish-to-visible delay. The OTS recovery SLA is 4.5 hours. POC rehearsals provide evidence of operational fit; they do not establish a long-term availability record.
-->

---

<div class="eyebrow">Decision · Next step after approval</div>

# A technical discovery meeting with Payload sales

<div class="columns-2">
  <div class="panel"><h2>Agenda with sales + solutions engineer</h2><p>Enterprise pricing and terms; feature depth and availability; ONE’s technical and workflow questions.</p><p>Tenant isolation, Drupal import, environment sync, GKE operations, security, recovery and AI data handling.</p></div>
  <div class="panel"><h2>Expected outputs</h2><p>Written answers and actions, Enterprise scope, technical constraints and trial access.</p><p>CMS licence/support quote or due date and a cost comparison against the 27 Drupal instances. Any AI pricing is separate.</p></div>
</div>

<div class="callout soft">Requested approval: engage Payload sales and allocate Team A to the POC once access and prerequisites are ready.</div>

<div class="callout">Next decision: review the POC evidence and confirm the implementation scope, capacity and budget.</div>

<!--
TA leads the technical questions with PPO; procurement supports commercial terms. Request a Payload solutions engineer alongside sales after management approval. This proposal does not imply a meeting is already booked or a licence purchased. Quantify savings after Monday's Drupal/Acquia breakdown and Payload's Enterprise quote. One logical CMS still requires supported infrastructure, upgrades and recovery; consolidation removes repeated work across 27 Drupal instances. The six-week POC clock starts once trial, data, PPO availability and environment access are available.
-->

---
layout: center
class: closing-slide
---

<img class="closing-logo" src="/one-logo.svg" alt="Ocean Network Express" />

# Thank you for listening

<div class="closing-subtitle">Questions and discussion</div>

<div class="closing-context">ONE content platform decision</div>

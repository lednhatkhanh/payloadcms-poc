---
theme: default
title: One governed CMS platform for ONE
author: ONE
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
download: false
exportFilename: cms-platform-decision
fonts:
  provider: none
layout: cover
class: cover-slide manager-slide
hideInToc: true
defaults:
  layout: default
---

<img class="one-logo" src="/one-logo.svg" alt="Ocean Network Express" />

# One governed CMS platform for ONE

<div class="cover-subtitle">Replace 27 Drupal instances to simplify publishing, deliver changes faster and reduce long-term maintenance.</div>

<div class="cover-meta">Decision proposal · September 2026</div>

<!--
Full pre-read: all 28 slides. The local meeting.md entry imports Slides 3, 4, 9, 12–17 and 19 for a 20-minute decision meeting, followed by discussion. Original page numbers remain as pre-read references.
This proposal requests a technical vendor meeting and one team for a focused Payload proof of concept. It does not approve a licence purchase or the full implementation.
Source: docs/demo/demo-plan.md, Decision requested.
-->

---
class: manager-slide overview-slide
---

<div class="eyebrow">Manager overview</div>

# Switch to one CMS to simplify work and lower cost

<p class="lede">Recommendation: evaluate Payload as ONE’s shared CMS. Technical detail begins on Slide 20.</p>

<div class="overview-list">
  <div><strong>01</strong><section><h2>Faster engineering decisions</h2><p>One shared backlog, common standards and reusable changes across countries.</p></section></div>
  <div><strong>02</strong><section><h2>Simpler publishing</h2><p>One editor portal, Google SSO, drafts, preview and planned releases.</p></section></div>
  <div><strong>03</strong><section><h2>Lower long-term effort</h2><p>Maintain one platform and reuse improvements across all 27 site scopes.</p></section></div>
  <div><strong>04</strong><section><h2>A practical path to switching</h2><p>Sales call → four-sprint proof of concept (POC) → implementation order.</p></section></div>
</div>

<div class="callout soft">The POC will test workflow fit and migration, and document recurring CMS costs before implementation is ordered.</div>

<div class="page-number">2 / 28</div>

<!--
Navigation slide. The manager section must stand alone without presenter narration.
Source: PLAN.md, Target slide sequence.
-->

---
class: manager-slide decision-slide
---

<div class="eyebrow">Decision requested now</div>

# Start with a Payload sales call and an eight-week POC

<p class="lede">A proof of concept (POC) is a bounded test of whether Payload fits ONE’s real operating needs.</p>

<div class="decision-grid">
  <div><span>1 · Call Payload sales</span><p>Confirm Enterprise scope, support, trial access, roadmap and pricing.</p></div>
  <div><span>2 · Run the POC</span><p>Eight people complete four two-week sprints against agreed evidence gates.</p></div>
  <div><span>3 · Decide whether to proceed with implementation</span><p>Proceed only after the POC evidence, total CMS cost and delivery capacity are accepted.</p></div>
  <div><span>Decision boundary</span><p>The sales call and POC do not approve a licence purchase or implementation.</p></div>
</div>

<div class="callout">Expected direction: lower CMS running cost and maintenance effort, with more consistent publishing.</div>

<div class="page-number">3 / 28</div>

<!--
Meeting route 1/10 · 1 min · pre-read Slide 3. State the decision boundary: approve the vendor discussion and eight-person POC allocation; implementation remains a later decision.
The sequence is explicit: Payload sales call, then the four-sprint POC, then a separate implementation order. The POC starts only when trial access, representative Drupal data, PPO availability and GCP access are ready.
Source: docs/demo/demo-plan.md, Decision requested.
-->

---
class: manager-slide
---

<div class="eyebrow">Why change · Current estate</div>

# Twenty-seven Drupal stacks repeat cost and maintenance

<div class="estate-summary">
  <div class="estate-number"><strong>27</strong><span>Drupal instances</span><p>26 country sites and one global site.</p></div>
  <div class="estate-effects">
    <div><h2>Repeated platform work</h2><p>Patches, releases, regression tests and support are repeated across separate stacks.</p></div>
    <div><h2>Fragmented operations</h2><p>Content, configuration and reporting sit across isolated databases and hosting boundaries.</p></div>
    <div><h2>Separate editing destinations</h2><p>Editors managing several sites switch between Drupal domains and site-specific settings.</p></div>
  </div>
</div>

<div class="callout soft">Engineering: reuse improvements across countries. Editors: one place to draft, preview and publish.</div>

<div class="page-number">4 / 28</div>

<!--
Meeting route 2/10 · 2 min · pre-read Slide 4. Explain how 27 separate stacks repeat work, then state the expected benefits: engineering reuses improvements across countries; editors get one place to draft, preview and publish. These are expected benefits, not measured results.
ONE currently operates 26 country Drupal instances plus one global instance. Next.js remains the public delivery layer.
Sources: docs/demo/demo-plan.md, Why change; Drupal update and configuration-management documentation.
-->

---
class: manager-slide
---

<div class="eyebrow">Proposed operating model</div>

# One platform connects decisions, delivery and publishing

<div class="before-after">
  <section>
    <span>Current</span>
    <h2>27 separate CMS stacks</h2>
    <p>Repeated hosting, upgrades, testing and support across country and global instances.</p>
  </section>
  <div class="direction-arrow">→</div>
  <section class="target">
    <span>Proposed</span>
    <h2>One shared CMS and editor portal</h2>
    <p>Centralize engineering priorities and releases. Keep country content ownership and access.</p>
  </section>
</div>

<div class="outcome-strip">
  <div><strong>One place to decide</strong><span>Shared backlog and technical standards</span></div>
  <div><strong>One place to improve</strong><span>Reusable features, fixes and integrations</span></div>
  <div><strong>One place to edit</strong><span>Country and global content with clear roles</span></div>
</div>

<div class="callout soft">Centralize the platform while preserving each country’s control over its content.</div>

<div class="page-number">5 / 28</div>

<!--
The target can use multiple replicas and environments. Added capacity is not free, and Drupal costs continue during coexistence.
Source: docs/demo/demo-plan.md, Why change.
-->

---
class: manager-slide benefits-slide
---

<div class="eyebrow">Engineering benefit · Faster decisions and delivery</div>

# Decide once, build once, improve every site

<div class="benefit-rows">
  <div><h2>Shorter path from request to release</h2><p>One shared backlog and clear technical ownership simplify prioritization, approvals and delivery.</p></div>
  <div><h2>Less development work over time</h2><p>Reuse page blocks, forms and integrations across countries. Extend a common solution for the next request.</p></div>
  <div><h2>Less repeated maintenance</h2><p>Share fixes, upgrades, tests and release tooling across the platform. Reduce separate configurations to maintain.</p></div>
  <div><h2>More predictable changes</h2><p>Use the same engineering standards, Google SSO and release process for CMS and website changes.</p></div>
</div>

<div class="callout soft">Example: improve a shared news template once, then release it to the countries that use it.</div>

<div class="page-number">6 / 28</div>

<!--
These are expected benefits of the proposed centralized operating model, not measured delivery gains or a claim that Drupal lacks these capabilities. Country exceptions still require design and testing. Team allocation remains as approved; this slide does not propose a staffing reduction or describe current organizational boundaries.
Source: user direction; docs/demo/demo-plan.md, Why change.
-->

---
class: manager-slide benefits-slide
---

<div class="eyebrow">Editor benefit · One workspace with practical safeguards</div>

# Give editors one place to work, preview and publish

<div class="benefit-rows compact-benefits">
  <div><h2>One portal + Google SSO</h2><p>Manage authorized country and global content in one place, without switching between 27 Drupal domains.</p></div>
  <div><h2>Drafts + autosave</h2><p>Prepare changes while the published page stays live. Save work as editors write.</p></div>
  <div><h2>Live Preview</h2><p>Check how a page will look on the website before publishing it.</p></div>
  <div><h2>Version history + trash bin</h2><p>Review earlier edits, restore a previous version, and recover content moved to trash.</p></div>
  <div><h2>Scheduled publishing</h2><p>Prepare a release in advance. Schedule when content goes live or returns to draft.</p></div>
</div>

<div class="callout soft">Google SSO is proven. Payload supports the editing tools above; ONE will enable them for the agreed content types and roles.</div>

<div class="page-number">7 / 28</div>

<!--
The proposed single portal uses the official Multi-Tenant plugin and requires ONE-specific permissions. Existing Pages configuration enables trash and drafts/autosave; other content types may differ. Version restore and trash restore are distinct operations, subject to permissions and retention. Scheduled publishing/unpublishing requires configuration and a running jobs worker. These are platform capabilities, not claims that every tool is already enabled across the demo or absent from Drupal.
Sources: https://payloadcms.com/docs/versions/overview ; https://payloadcms.com/docs/versions/drafts ; https://payloadcms.com/docs/versions/autosave ; https://payloadcms.com/docs/trash/overview ; https://payloadcms.com/docs/live-preview/overview ; https://payloadcms.com/docs/plugins/multi-tenant
-->

---
class: manager-slide benefits-slide
---

<div class="eyebrow">Editor benefit · Reuse, collaboration and AI assistance</div>

# Make content easier to reuse, review and update

<div class="benefit-rows">
  <div><h2>Reusable content and media</h2><p>Use approved page blocks and assets across authorized sites. Maintain language variants in one editing experience.</p></div>
  <div><h2>Publishing and translation workflows</h2><p>Give each review, approval and language task a clear owner and status. Validate advanced Enterprise workflows in the POC.</p></div>
  <div><h2>MCP for assisted content work</h2><p>Connect approved AI tools to find content and help prepare updates. Payload’s official MCP server is available; ONE configures access and review.</p></div>
  <div><h2>Future AI-assisted editing</h2><p>Plan for writing, translation and image assistance as vendor features become available. Keep editors responsible for approval.</p></div>
</div>

<div class="callout soft">Expected value: less copying, fewer review handoffs and more time spent improving content. AI integration and usage are priced separately.</div>

<div class="page-number">8 / 28</div>

<!--
MCP means Model Context Protocol. The plugin provides tools; the connected model/client, permissions, draft behavior and review process determine the editorial experience. This is an integration opportunity, not a claim of an out-of-box writing assistant or automatic approval enforcement. Built-in Enterprise AI release and licence scope need confirmation. Shared content propagation and language approvals require ONE-specific design.
Sources: https://payloadcms.com/docs/plugins/mcp ; https://payloadcms.com/docs/fields/blocks ; https://payloadcms.com/docs/configuration/localization ; https://payloadcms.com/enterprise/publishing-workflows ; https://payloadcms.com/enterprise/enterprise-ai
-->

---
class: manager-slide
---

<div class="eyebrow">Recommendation · Meaningful differences</div>

# Payload lets ONE build on its existing engineering skills

<div class="candidate-comparison">
  <section class="recommended">
    <span>Preferred</span>
    <h2>Payload</h2>
    <p>Uses the same TypeScript, React, Next.js and PostgreSQL skills as ONE’s website platform.</p>
    <p>Shared code and official plugins support reusable forms, country access rules and integrations.</p>
  </section>
  <section>
    <span>Credible alternative</span>
    <h2>Directus</h2>
    <p>Strong visual data management, workflow automation and configuration-sync capabilities.</p>
    <p>Existing internal familiarity remains a relevant advantage.</p>
  </section>
</div>

<div class="callout soft">Both support self-hosting, APIs and access controls. Payload is preferred for its fit with ONE’s shared engineering approach.</div>

<div class="page-number">9 / 28</div>

<!--
Meeting route 3/10 · 2 min · pre-read Slide 9. Explain Payload’s engineering fit and acknowledge Directus’s strengths. This is a candidate recommendation, not proven fit.
The recommendation is a fit judgment, not proof of faster delivery or complete Enterprise coverage. Exactly one CMS will be selected.
Sources: Payload plugin and Enterprise documentation; Directus Enterprise and 12.3 release documentation.
-->

---
class: manager-slide future-proof-slide
---

<div class="eyebrow">Future-proofing · Market and ownership signals</div>

# Payload offers open-source ownership and a roadmap voice

<div class="future-proof-grid">
  <section class="recommended">
    <span>Payload</span>
    <h2>MIT open source with Figma backing</h2>
    <p>The core is MIT open source and self-hostable. Payload joined Figma in June 2025; Enterprise features and support are paid separately.</p>
    <p><strong>Roadmap voice:</strong> Payload explicitly offers Enterprise customers influence over its roadmap.</p>
    <p><strong>Published users:</strong> Microsoft, ASICS and Blue Origin.</p>
  </section>
  <section>
    <span>Directus</span>
    <h2>Source available under MSCL</h2>
    <p>Directus v12 uses MSCL, with GPLv3 conversion after four years. Its free Core tier has limits; ONE needs a commercial scope review.</p>
    <p><strong>Roadmap voice:</strong> Public feature requests are supported. Confirm Enterprise influence and priority commitments with sales.</p>
    <p><strong>Published users:</strong> Copa Airlines and Ripley Entertainment.</p>
  </section>
</div>

<div class="callout soft">ONE can retain its code, data and extensions. For either vendor, a roadmap request needs an agreed commitment before it becomes a delivery dependency.</div>

<div class="page-number">10 / 28</div>

<!--
Figma announced that the Payload team joined Figma on 17 June 2025 and stated that Payload would remain open source. Enterprise roadmap influence does not guarantee delivery or dates. Correction: BSL and the three-year conversion describe older Directus releases. Directus v12 uses MSCL, a source-available licence with GPLv3 conversion after four years; current plans have seat and feature limits. Confirm licence version, commercial scope and roadmap terms. Published customers are vendor references, not proof of ONE-specific fit or endorsements of this proposal. Data ownership helps exit planning but does not eliminate migration work.
Sources checked 13 September 2026: https://www.figma.com/blog/payload-joins-figma/ ; https://payloadcms.com/enterprise ; https://payloadcms.com/case-studies ; https://directus.com/resources/directus-v12-license-change ; https://directus.com/pricing ; https://docs.directus.io/contributing/introduction ; https://directus.com/enterprise
-->

---
class: manager-slide
---

<div class="eyebrow">Evidence boundary</div>

# Build on the demo; test ONE’s remaining requirements

<div class="evidence-columns">
  <section>
    <h2>What we understand</h2>
    <ul>
      <li>Google SSO is proven for editors and developers.</li>
      <li>Drafts, autosave and preview are configured in the demo.</li>
      <li>Content and language models fit the website stack.</li>
      <li>Official plugins support multiple sites, forms and MCP.</li>
    </ul>
  </section>
  <section class="open">
    <h2>What the POC will confirm</h2>
    <ul>
      <li>ONE’s country/global ownership and access rules.</li>
      <li>Advanced publishing and translation workflow fit.</li>
      <li>Representative Drupal imports and business forms.</li>
      <li>Payload Enterprise scope, support and total cost.</li>
    </ul>
  </section>
</div>

<div class="callout soft">Focus the POC on country access, editor workflows and migration using representative ONE content.</div>

<div class="page-number">11 / 28</div>

<!--
Google SSO and GKE deployment are already understood and do not need to be reproved. Form Builder and the MCP server provide foundations, not complete ONE integrations. Environment promotion remains exploratory work outside the defined POC gates.
Sources: docs/demo/demo-plan.md, What the POC will establish; https://payloadcms.com/docs/plugins/overview ; https://payloadcms.com/docs/plugins/mcp
-->

---
class: manager-slide
---

<div class="eyebrow">Manager risks · Proposed responses</div>

# Four risks to manage before rollout

<div class="benefit-rows">
  <div><h2>Migration complexity</h2><p>Hidden content, media or form dependencies can delay retirement. Prove sample imports, reconcile each wave and retain rollback until acceptance.</p></div>
  <div><h2>Enterprise fit and cost</h2><p>Required workflows or terms may not fit. Test the licensed product and obtain a written quote; resolve gaps before ordering.</p></div>
  <div><h2>Country ownership</h2><p>Unclear shared-content rules can delay approval or expose content. Agree content ownership and access rules with country leads; verify denied access.</p></div>
  <div><h2>Shared-platform outages</h2><p>One outage can affect all countries. Test restore and rollback, establish incident responsibilities and monitor CMS and public delivery separately.</p></div>
</div>

<div class="callout soft">Persons in charge (PICs) will be agreed later. These proposed responses cover both POC and implementation work.</div>

<div class="page-number">12 / 28</div>

<!--
Meeting route 4/10 · 3 min · pre-read Slide 12. Review the four risks and proposed responses. PIC assignments remain open; do not imply that TA, PPO, Procurement or Platform/Operations have accepted responsibility.
The pending alignment concerns PIC assignments, not a change to the proposed POC scope. This slide adds no requirement to appoint PICs before POC kickoff. Representative imports, Enterprise fit and access tests belong to the proposed POC; production migration waves, recovery and operational controls continue during implementation. Proposed responses span those stages rather than promising that the POC resolves every risk. Content ownership rules are product requirements, distinct from assigning a PIC to manage each risk.
Sources: docs/demo/demo-plan.md, Manager risks and proposed responses; docs/demo/poc-delivery-plan.md, Manager risks and proposed responses.
-->

---
class: manager-slide
---

<div class="eyebrow">POC commitment</div>

# Allocate eight people for an eight-week POC

<div class="team-layout">
  <section>
    <h2>Team A runs the POC</h2>
    <div class="team-counts">
      <div><strong>4</strong><span>Developers</span></div>
      <div><strong>2</strong><span>QA</span></div>
      <div><strong>1</strong><span>PPO</span></div>
      <div><strong>1</strong><span>TA</span></div>
    </div>
    <p>The PPO owns the backlog and confirms the flows. The technical architect (TA) owns technical evidence. QA owns testing.</p>
  </section>
  <section>
    <h2>Team B continues current delivery</h2>
    <p>Its later implementation role requires a separate portfolio decision after the POC.</p>
    <h2>Before Week 1</h2>
    <p>Secure Enterprise trial access, representative Drupal data, PPO availability and GCP access.</p>
  </section>
</div>

<div class="callout soft">Eight people: 4 developers, 2 QA, 1 PPO and 1 TA. Prioritize required gates; defer optional exploration. Training starts during implementation.</div>

<div class="page-number">13 / 28</div>

<!--
Meeting route 5/10 · 2 min · pre-read Slide 13. Confirm four developers, two QA, one PPO and one TA for eight weeks. Check prerequisites and prioritize mandatory evidence.
PO gives higher-level direction and approvals outside the team count. The POC allocation is reduced from ten to eight by assigning four developers; two QA, one PPO and one TA remain. Team B continues current delivery. Four developers work in two pairs and sequence platform/integration work around tenancy/workflows and imports. The eight-week target remains conditional on ready inputs and agreed representative scope. Optional AI and environment-promotion exploration must not displace required evidence. There is no real-user training or usability trial during the POC.
Source: docs/demo/demo-plan.md, Team and timetable.
-->

---
class: manager-slide timeline-slide
---

<div class="eyebrow">POC plan</div>

# Four sprints produce reviewable evidence

<div class="sprint-row">
  <section><span>Weeks 1–2</span><h2>Agree the test</h2><p>Confirm use cases and tenant rules. Profile Drupal samples. Verify Enterprise access.</p><strong>Exit: access matrix and sample agreed</strong></section>
  <section><span>Weeks 3–4</span><h2>Prove content flows</h2><p>Import news and iframe pages. Test publishing, translation and a representative form.</p><strong>Exit: import and PPO-confirmed flow evidence</strong></section>
  <section><span>Weeks 5–6</span><h2>Test platform controls</h2><p>Test tenant isolation, drafts, extensions and representative load.</p><strong>Exit: security and quality evidence</strong></section>
  <section><span>Weeks 7–8</span><h2>Close the decision</h2><p>Resolve critical/high defects. Confirm Enterprise scope, total cost and implementation backlog.</p><strong>Exit: go / no-go and implementation recommendation</strong></section>
</div>

<div class="page-number">14 / 28</div>

<!--
Meeting route 6/10 · 2 min · pre-read Slide 14. Walk through the four sprint exits. Explain that optional exploration cannot displace the required gates.
All four sprints are planned work with fixed scope. AI Agent support is an engineering approach, not a guaranteed productivity multiplier.
Source: docs/demo/demo-plan.md, Team and timetable.
-->

---
class: manager-slide
---

<div class="eyebrow">POC decision gates</div>

# Five gates protect the implementation decision

<div class="gate-list">
  <div><strong>1</strong><span><b>Use-case coverage</b> Tenant, publishing, translation and form flows work; PPO confirms them.</span></div>
  <div><strong>2</strong><span><b>Drupal import</b> News and iframe samples retain required media and relationships.</span></div>
  <div><strong>3</strong><span><b>Safe operation</b> Tenant access, approvals and unpublished content are protected.</span></div>
  <div><strong>4</strong><span><b>Service readiness</b> Document the production controls needed to meet ONE’s existing service agreement.</span></div>
  <div><strong>5</strong><span><b>Decision readiness</b> No open critical/high defects; PPO, TA and QA sign off; Enterprise scope and CMS costs are documented.</span></div>
</div>

<div class="callout soft">If a required capability remains unresolved, choose a clear response: narrow scope, build an extension, extend validation or stop.</div>

<div class="page-number">15 / 28</div>

<!--
Meeting route 7/10 · 2 min · pre-read Slide 15. Agree what evidence is required to proceed and how unresolved gaps will be handled.
These are qualitative decision gates, not percentage targets. GKE deployment is already understood; the POC documents the remaining production controls and evidence plan.
Source: docs/demo/demo-plan.md, POC decision gates.
-->

---
class: manager-slide roadmap-slide
---

<div class="eyebrow">Implementation after the POC</div>

# Migration follows the POC in controlled waves

<p class="sequence-label"><strong>Required order:</strong> Payload sales call → 8-week POC → evidence review → implementation order → implementation Month 1</p>

<table class="roadmap-table">
<thead><tr><th>Provisional period</th><th>Engineering</th><th>Content and business</th></tr></thead>
<tbody>
<tr><td>Months 1–3</td><td>Platform foundation and integrations</td><td>Inventory, cleanup and form decisions</td></tr>
<tr><td>Months 4–6</td><td>Pilot launch; begin coexistence</td><td>Train pilot editors; user acceptance</td></tr>
<tr><td>Months 7–12</td><td>Main page and news migration waves</td><td>Review languages; approve each wave</td></tr>
<tr><td>Months 13–15</td><td>Remaining iframe content and forms</td><td>Accept remaining content and forms</td></tr>
<tr><td>Months 16–18</td><td>Final deltas; retire Drupal</td><td>Final sign-off and archive approval</td></tr>
</tbody>
</table>

<p class="caption">The 18-month target starts only after POC acceptance and the implementation order. The fastest consecutive scenario is about 20 months; approval or procurement gaps can extend it.</p>

<div class="page-number">16 / 28</div>

<!--
Meeting route 8/10 · 2 min · pre-read Slide 16. Make clear that the provisional 18-month implementation starts after POC acceptance and a separate order. Drupal retirement depends on accepted waves.
Rebaseline after the POC. Full retirement also depends on content acceptance and contract notice periods.
Source: docs/demo/demo-plan.md, Implementation and Drupal retirement.
-->

---
class: manager-slide budget-slide
---

<div class="eyebrow">Drupal and new CMS cost comparison</div>

# Total new CMS cost pending Enterprise quote

<div class="cost-summary">
  <section class="current-cost"><span>Current Drupal / Acquia</span><strong>$265,000</strong><p>two-year run rate at the supplied $132,500 annual subtotal</p></section>
  <section><span>New CMS · Added GCP</span><strong>$12,000–27,600</strong><p>two-year allowance, before the Enterprise licence</p></section>
  <section><span>New CMS · Total recurring cost</span><strong>Pending quote</strong><p>Added GCP + Enterprise licence and support</p></section>
</div>

<div class="cost-rules">
  <div><h2>Baseline to reconcile</h2><p>The supplied Drupal line items do not match its subtotal. Procurement must confirm the contract total.</p></div>
  <div><h2>New CMS total</h2><p>Added GCP infrastructure + Payload Enterprise. Development and AI remain excluded.</p></div>
</div>

<div class="callout soft">USD recurring-cost comparison. Pay for both platforms during migration. Savings depend on Drupal contract retirement. AI and development excluded.</div>

<div class="page-number">17 / 28</div>

<!--
Meeting route 9/10 · 3 min · pre-read Slide 17. Explain that total recurring cost is pending the Enterprise quote. Keep the Drupal baseline reconciliation, coexistence spending and exclusions explicit.
USD before tax. The supplied Drupal image states a $132,500 annual infrastructure subtotal, or $265,000 over two years, with Acquia licence/support included. Its displayed line items do not reconcile to that subtotal, so procurement must confirm the baseline. The new-CMS range remains a rough planning allowance. These are comparable two-year run rates, not a forecast of transition cash flow. Budget coexistence from actual cutover dates and contract notice periods. Procurement must confirm currency, term, support, environments, backup and capacity assumptions before a savings claim.
Sources: user-supplied Drupal cost image, 13 September 2026; https://cloud.google.com/sql/pricing ; https://cloud.google.com/storage/pricing ; docs/demo/poc-delivery-plan.md.
-->

---
class: manager-slide outcomes-slide
---

<div class="eyebrow">Outcomes after rollout</div>

# Success means complete migration and practical improvement

<div class="outcome-list">
  <div><strong>Complete retirement</strong><span>100% of agreed content accepted across all 27 scopes, with no remaining Drupal dependency by implementation Month 18.</span></div>
  <div><strong>Editor readiness</strong><span>At least 80% of active editors are trained and can complete core publishing tasks.</span></div>
  <div><strong>Publishing efficiency</strong><span>Aim for 10% less publishing and reviewed-translation time without reducing quality.</span></div>
  <div><strong>Reliable service</strong><span>At least 97% annual CMS availability including planned downtime, aligned with Unicorn. Recovery must meet the OTS SLA.</span></div>
  <div><strong>Lower operating burden</strong><span>Lower CMS running cost and maintenance effort than the current Drupal estate.</span></div>
</div>

<p class="caption">The improvement targets are proposals, not measured results. Establish comparable Drupal baselines during implementation.</p>

<div class="page-number">18 / 28</div>

<!--
Measure CMS and public delivery separately. Retirement requires content acceptance, form destinations, archives and business/operations sign-off.
Source: docs/demo/demo-plan.md, Success after rollout.
-->

---
class: manager-slide next-step-slide
---

<div class="eyebrow">Decision path</div>

# Take the next step toward a simpler CMS platform

<div class="decision-path three-step">
  <div><strong>1</strong><h2>Call Payload sales</h2><p>Confirm Enterprise scope, trial, support, roadmap and pricing.</p></div>
  <div><strong>2</strong><h2>Run four POC sprints</h2><p>Allocate eight people for eight weeks to collect evidence against the five gates.</p></div>
  <div><strong>3</strong><h2>Decide whether to proceed with implementation</h2><p>Proceed only after evidence, total cost, capacity and backlog are accepted.</p></div>
</div>

<div class="decision-statement">Approve the sales call and POC allocation to turn the benefits into a tested implementation decision.</div>

<div class="page-number">19 / 28</div>

<!--
Meeting route 10/10 · 1 min · pre-read Slide 19. Request the sales call and POC allocation decision. Record conditions, action owners and the next review; do not imply implementation approval.
TA and PPO meet Payload sales and a solutions engineer, with procurement support. Written answers, trial access and a quote prepare the POC; accepted POC evidence prepares the implementation order.
Source: docs/demo/demo-plan.md, Technical meeting after approval.
-->

---
class: technical-overview technical-slide
---

<div class="eyebrow">Technical overview</div>

# Technical design and validation

<p class="section-intro">The proposed platform fits ONE’s current delivery model. The POC must prove the operating details.</p>

<div class="technical-toc">
  <div><strong>01</strong><span>Architecture and coexistence</span></div>
  <div><strong>02</strong><span>Content ownership and workflow</span></div>
  <div><strong>03</strong><span>Drupal migration and cutover</span></div>
  <div><strong>04</strong><span>Operations, security and quality</span></div>
  <div><strong>05</strong><span>Enterprise scope, MCP and optional AI</span></div>
</div>

<p class="section-detail">Each technical decision remains provisional until the POC or later production testing supplies the required evidence.</p>

<div class="page-number">20 / 28</div>

<!--
Section navigation only. Manager narrative ends on Slide 19.
-->

---
class: technical-slide diagram-slide
---

<div class="eyebrow">Architecture · Controlled coexistence</div>

# Next.js enables controlled CMS coexistence

<img class="diagram-image migration-architecture" src="/diagrams/drupal-coexistence-migration.png" alt="Next.js dual-source routing with Payload, Drupal adapters, tracked iframes and per-wave connection retirement" />

<div class="diagram-conclusion">Give each route or item one authoritative CMS. Keep route-level rollback, reconcile final Drupal changes, then retire the accepted wave’s Drupal connection.</div>

<div class="page-number">21 / 28</div>

<!--
Pages move route by route, news in repeatable collection waves, and forms after end-to-end validation. Never edit the same item in both CMSs.
Sources: https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module ; https://payloadcms.com/docs/rest-api/overview
-->

---
class: technical-slide diagram-slide
---

<div class="eyebrow">Architecture · Target platform</div>

# Payload fits the existing GCP delivery platform

<img class="diagram-image target-architecture" src="/diagrams/target-cms-gcp.png" alt="Vendor-neutral target CMS architecture on Google Cloud Platform" />

<div class="diagram-conclusion">Reuse GKE and Cloudflare; add Cloud SQL and GCS. This is a target design: the diagram’s Enterprise AI features remain planned and require release confirmation.</div>

<div class="page-number">22 / 28</div>

<!--
The target diagram remains vendor-neutral so Payload and Directus can be assessed against the same operating model. Google SSO through Cloud Identity is already proven in the demo; the vendor discussion only needs to confirm its Enterprise commercial and support scope.
Sources: https://payloadcms.com/docs/production/deployment ; https://payloadcms.com/docs/upload/storage-adapters ; https://payloadcms.com/enterprise ; https://docs.cloud.google.com/sql/docs/postgres/configure-ha
-->

---
class: technical-slide
---

<div class="eyebrow">Content model · Scope and language</div>

# Country ownership and language are separate controls

<div class="scope-language">
  <section class="scope-count"><strong>27</strong><span>site scopes</span><p>One governed codebase using Payload’s multi-tenant foundation.</p></section>
  <section>
    <h2>Seven supported languages</h2>
    <div class="language-list"><span>English</span><span>Chinese</span><span>Japanese</span><span>Korean</span><span>Spanish</span><span>Portuguese</span><span>French</span></div>
  </section>
</div>

<div class="control-pairs">
  <div><h2>Country or global scope</h2><p>Defines ownership, access and where content can be used.</p></div>
  <div><h2>Language</h2><p>Defines which localized variant is written, reviewed and published.</p></div>
  <div><h2>Shared content</h2><p>Needs explicit source ownership and reuse rules across scopes.</p></div>
</div>

<div class="callout soft">POC question: can multi-tenant support enforce ONE’s ownership and access rules without recreating 27 CMS stacks?</div>

<div class="page-number">23 / 28</div>

<!--
The language list does not prescribe which languages every country publishes.
Sources: https://payloadcms.com/docs/plugins/multi-tenant ; https://payloadcms.com/docs/configuration/localization
-->

---
class: technical-slide
---

<div class="eyebrow">Content model · Workflow and extensions</div>

# Publishing needs governed workflow and extensibility

<div class="publishing-flow">
  <div><strong>Structured editing</strong><span>Use approved fields, rich text and page blocks.</span></div>
  <div><strong>Live preview</strong><span>See the actual Next.js experience while editing.</span></div>
  <div><strong>Advanced workflow</strong><span>Track feedback, approval and translation status.</span></div>
  <div><strong>Publish</strong><span>Schedule localized releases with clear accountability.</span></div>
</div>

<div class="extension-grid">
  <section><h2>Official foundations</h2><p>Multi-Tenant and Form Builder plugins, localization and Live Preview.</p></section>
  <section><h2>ONE-specific work</h2><p>Frontend form behavior, submission integrations, migration tools and workflow extensions.</p></section>
  <section><h2>Enterprise validation</h2><p>Confirm advanced publishing and translation workflows in the trial and vendor meeting.</p></section>
</div>

<div class="callout soft">An official plugin is a starting point. It does not prove that every ONE business flow works without extension.</div>

<div class="page-number">24 / 28</div>

<!--
Country ownership and language remain independent. Business-specific forms require frontend, consent, routing, retention and submission validation.
Sources: https://payloadcms.com/docs/plugins/form-builder ; https://payloadcms.com/docs/live-preview/overview ; https://payloadcms.com/enterprise/publishing-workflows
-->

---
class: technical-slide migration-detail-slide
---

<div class="eyebrow">Migration · Repeatable cutover</div>

# Drupal migration needs repeatable import and cutover rules

<table class="migration-table">
<thead><tr><th>Content group</th><th>Technical treatment</th><th>Acceptance and cutover</th></tr></thead>
<tbody>
<tr><td>Pages</td><td>Migrate layouts, content, media and required languages.</td><td>Owner accepts each wave, including redirects, links and search visibility.</td></tr>
<tr><td>News</td><td>Import dates, media and relationships; support repeatable deltas.</td><td>Reconcile final changes before cutover.</td></tr>
<tr><td>Iframe content</td><td>Import underlying content/assets and rebuild required behavior.</td><td>Remove the Drupal-hosted dependency.</td></tr>
<tr><td>Forms</td><td>Migrate, rebuild or centralize each approved form destination.</td><td>Validate consent, submission, routing and retention.</td></tr>
</tbody>
</table>

<div class="callout soft">One authoritative CMS per route or item. Keep rollback during validation; remove Drupal only after acceptance.</div>

<div class="page-number">25 / 28</div>

<!--
POC evidence covers representative news and iframe pages with required media and relationships. Complete migration covers all accepted content groups and form destinations. Proposed implementation acceptance also checks redirect mappings, links, canonical URLs, sitemaps and search visibility. Name a rollback owner and reconcile post-cutover edits before reversing route ownership.
Source: docs/demo/demo-plan.md, Implementation and Drupal retirement.
-->

---
class: technical-slide
---

<div class="eyebrow">Operations · Production fit</div>

# Production readiness needs clear service controls

<div class="operations-list">
  <div><strong>Deployment</strong><span>GKE deployment is established; define environment ownership and release controls.</span></div>
  <div><strong>Data</strong><span>Own PostgreSQL in Cloud SQL and media in a dedicated GCS bucket.</span></div>
  <div><strong>Capacity</strong><span>Measure real traffic and workload; existing shared capacity is not unlimited.</span></div>
  <div><strong>Recovery</strong><span>Test backup, restore and recovery against the 4.5-hour OTS SLA.</span></div>
  <div><strong>Observability</strong><span>Track CMS and public delivery health, errors, latency and publish-to-visible freshness.</span></div>
</div>

<div class="callout soft">One shared CMS increases the impact of an outage. Test restore and rollback, assign incident ownership, and verify the production controls.</div>

<div class="page-number">26 / 28</div>

<!--
Payload can run on ONE’s GKE platform. Cloud SQL high availability, backup assumptions, region, environment count and any added capacity still require implementation sizing. Implementation must also define environment promotion, recovery-point objectives, incident ownership and rollback responsibilities. The 4.5-hour recovery commitment does not specify acceptable data loss.
Sources: Payload production deployment documentation; Cloud SQL HA documentation; docs/demo/poc-delivery-plan.md.
-->

---
class: technical-slide
---

<div class="eyebrow">Security and quality evidence</div>

# Security and quality require explicit evidence

<table class="evidence-table">
<thead><tr><th>Area</th><th>Required evidence</th><th>When to decide</th></tr></thead>
<tbody>
<tr><td>Tenant and draft isolation</td><td>Access tests block unauthorized cross-scope access and public reads of drafts.</td><td>POC gate</td></tr>
<tr><td>Critical defects</td><td>No open critical/high findings; PPO, TA and QA sign off.</td><td>POC gate</td></tr>
<tr><td>Performance</td><td>POC records representative load results. Implementation sets and verifies service targets.</td><td>POC + implementation</td></tr>
<tr><td>Content freshness</td><td>Approved changes appear correctly on the site and in search.</td><td>Implementation</td></tr>
<tr><td>Reliability and recovery</td><td>Availability is measured separately; recovery meets the OTS SLA.</td><td>Implementation + production</td></tr>
</tbody>
</table>

<div class="callout soft">Set detailed performance targets from measured workload and capacity. Do not invent thresholds before evidence exists.</div>

<div class="page-number">27 / 28</div>

<!--
The POC gates are qualitative. The proposed annual CMS availability target is at least 97%, including planned downtime and aligned with Unicorn. Measure CMS and public delivery separately.
Source: docs/demo/demo-plan.md, POC decision gates and Success after rollout.
-->

---
class: technical-slide final-slide
---

<div class="eyebrow">Open technical and commercial questions</div>

# MCP is available; AI-assisted editing remains planned

<div class="final-grid">
  <section>
    <h2>Confirm with Payload</h2>
    <ul>
      <li>Enterprise pricing, support terms and trial access.</li>
      <li>Tenant isolation and advanced workflow depth.</li>
      <li>Drupal import, security, service controls and upgrade constraints.</li>
      <li>Environment-promotion options and required extensions.</li>
    </ul>
  </section>
  <section>
    <h2>Plan governed AI assistance</h2>
    <ul>
      <li>Use the official MCP server with explicit collection and action permissions.</li>
      <li>Future AI-assisted translation, writing and image tools require release confirmation.</li>
      <li>Do not let AI experiments displace required POC evidence.</li>
      <li>Price AI integration and usage separately from the CMS budget.</li>
    </ul>
  </section>
</div>

<div class="final-output"><strong>Required outputs</strong><span>Written answers and actions · Enterprise scope and constraints · trial access · licence/support quote or due date</span></div>

<div class="callout">The implementation decision follows evidence. A vendor meeting or successful demo does not commit ONE to purchase or rollout.</div>

<div class="page-number">28 / 28</div>

<!--
Payload's AI page checked 13 September 2026 presents AI translation, image generation and writing assistance as future or roadmap capabilities, with “Coming Soon” labels on parts of the offer. The official MCP plugin is available now and supports per-capability access controls. Do not treat roadmap features as available trial features.
Sources: https://payloadcms.com/enterprise/enterprise-ai ; https://payloadcms.com/docs/plugins/mcp ; docs/demo/demo-plan.md, Technical meeting after approval.
-->

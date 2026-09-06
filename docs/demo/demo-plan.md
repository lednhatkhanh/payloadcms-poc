# ONE CMS platform proposal

## Decision requested

Approve a technical discovery meeting with Payload sales and a solutions engineer, and allocate **one team to a six-week Payload POC target, with up to two additional weeks for unresolved validation or vendor dependencies** once trial access, Drupal data and GCP access are ready. Payload is the preferred candidate; Directus remains the comparison if the POC reveals a fundamental gap.

The intended outcome is **lower CMS running cost and maintenance effort across the actual 27 Drupal instances**, together with more consistent publishing. The implementation target is **18 months after the separate POC and implementation approval**. This is a planning target, not a committed rollout date.

The current approval covers evaluation and team allocation. The implementation decision follows the POC evidence, documented Enterprise scope, team/content capacity and CMS budget. A licence purchase and full rollout require that later decision.

Use the [management deck](../../apps/slides/slides.md) ([editable Google Slides](https://docs.google.com/presentation/d/1iL6dRuwJaBpfwgokHBY0m0AyClTgALUG6SGwGdc2BEM/edit)) for the meeting and the [delivery plan](./poc-delivery-plan.md) for sprint detail, budget assumptions and acceptance evidence. This proposal is the management summary; the delivery plan is the execution authority.

## Why change

ONE operates 26 country Drupal instances plus one global instance. Repeated patching, releases, regression testing and support increase the maintenance burden. Country and global content teams need shared publishing controls while retaining their own ownership and access.

The target is one logical CMS platform on ONE-managed GCP. It can have multiple replicas and environments; consolidation means shared governance and operations. Reuse the current app’s GKE cluster and Cloudflare project, add Cloud SQL PostgreSQL and a dedicated GCS bucket, and retain Next.js as the delivery layer.

The new platform should reduce recurring cost and maintenance. Savings start as Drupal services and contracts retire; both platforms continue to incur costs during coexistence. The current budget leaves planned TBC inputs open until they are supplied.

[Current architecture](./diagrams/current-platform-context.drawio) · [Target architecture](./diagrams/target-cms-gcp.drawio)

## Why Payload is preferred

| Decision factor    | Payload fit                                                                                                      | Directus comparison                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Engineering model  | Code-first TypeScript, React Admin and Next.js alignment fit the existing team                                   | Strong data-platform and Studio model; existing internal familiarity                           |
| Extension approach | Official forms and multi-tenant plugins, plus custom plugins for ONE-specific needs                              | Studio automation, Flows and schema/configuration sync are useful strengths                    |
| Content operations | Validate Enterprise publishing and translation workflows against ONE’s use cases                                 | Retain as the alternative benchmark if required workflows do not fit                           |
| Ownership          | Self-hosted application, database and media; MIT-licensed core with Enterprise licence/support quoted separately | Evaluate against the same hosting, support and commercial requirements if the decision reopens |

This is a fit recommendation, not proof that every use case is already solved. The POC must validate the actual tenant model and workflows. The official Form Builder is a foundation; business-specific forms still need frontend and submission integration work.

Exactly one CMS will be selected. There is no parallel Directus POC or fallback CMS runtime in this proposal.

## What the POC will establish

The existing demo provides familiarity with Payload’s content model, localization, code-first configuration and extension approach. GCP/GKE hosting is an understood architecture choice. The POC concentrates on ONE-specific evidence:

- **Use-case coverage:** global/country content ownership, permissions, publishing, translation and representative forms, with PPO flow confirmation.
- **Drupal import:** import news and iframe pages, including required media and relationships. Ordinary local/global pages remain part of implementation migration, outside the POC import sample.
- **Safe operation:** tenant isolation, approvals, protection of unpublished content and recovery under the OTS SLA.
- **Enterprise fit:** confirm available features, trial access, support conditions and CMS costs with the vendor.

Environment promotion is exploratory work and is outside the POC gates. Available AI can be assessed for integration fit; AI integration and usage costs are calculated separately. Additional experimentation, RAG and custom providers must not displace the required POC evidence.

### Team and timetable

Each team has **6 developers, 2 QA, 1 PPO and 1 TA**, or 10 people. Team A owns the POC; Team B continues current delivery. PPO owns the team backlog and acceptance. TA owns technical evidence. PO provides higher-level direction and approvals outside the teams.

The POC runs for **three two-week sprints and an optional contingency sprint**, supported by AI Agents and human review. PPO confirms the flows; there is no real-user training or end-user usability trial during the POC. Training and user acceptance start during implementation.

| Sprint             | Reviewable result                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Weeks 1–2          | Confirm use cases and tenant rules; profile Drupal samples, verify Enterprise access and establish baseline checks |
| Weeks 3–4          | Import news/iframe pages; validate publishing, translation and form flows with PPO                                 |
| Weeks 5–6          | Complete operational checks, resolve critical/high defects and review the decision gates                           |
| Optional weeks 7–8 | Resolve specific outstanding validation or vendor gaps; repeat affected checks and close the POC                   |

[POC timeline diagram](./diagrams/poc-timeline.drawio) · [Detailed sprint plan](./poc-delivery-plan.md#detailed-poc-timeline-six-week-target-and-contingency)

### POC decision gates

| Gate                           | Evidence required                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Use-case coverage              | Payload covers ONE’s agreed tenant, publishing, translation and form use cases; PPO confirms the flows |
| Drupal import                  | Demonstrate the ability to import news and iframe pages with required media and relationships          |
| Safe operation                 | Validate tenant access, approvals and protection of unpublished content                                |
| Operations and recovery        | Meet the OTS SLA                                                                                       |
| Quality and decision readiness | Zero open critical/high defects; PPO, TA and QA sign-off; Enterprise scope and CMS costs documented    |

These are qualitative gates. Unresolved use-case or Enterprise gaps require a decision before implementation. The OTS recovery SLA is 4.5 hours; detailed recovery sub-targets are not part of this proposal.

## Implementation and Drupal retirement

**The 18-month implementation window excludes the POC.** About 19.5–20 months elapse from POC kickoff if implementation follows immediately; approval or procurement gaps can extend that sequence.

| Implementation period | Engineering delivery                              | Content and business involvement                               |
| --------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| Months 1–3            | Foundation, integrations and migration tooling    | Inventory, cleanup, form decisions and wave ownership          |
| Months 4–6            | Pilot launch and controlled coexistence           | Pilot training, user acceptance and baseline measurement       |
| Months 7–12           | Main global/country page and news waves           | Review language variants, accept waves and publish new content |
| Months 13–15          | Remaining iframe content, forms and complex cases | Complete content/form acceptance and training                  |
| Months 16–18          | Final deltas, stabilization and Drupal retirement | Final sign-off and archive approval                            |

Proposed implementation allocation: Team A owns platform and operations; Team B owns website integration and migration. Confirm both teams’ availability and content-review capacity after the POC. [Implementation timeline](./diagrams/implementation-timeline.drawio)

Full migration covers **all local/global pages and required languages, all news, Drupal iframe content and forms**. Import iframe content and remove its Drupal dependency; retaining a Drupal iframe URL is not completion. Business chooses whether each form is migrated, rebuilt or centralized.

During coexistence, new content goes to Payload as its destination becomes ready. Each route/item has one authoritative CMS. Reconcile final Drupal changes before cutover, keep rollback available during validation, then remove the accepted wave’s Drupal connection.

Retirement requires **100% of the agreed Drupal inventory migrated and accepted**, no remaining live Drupal dependencies, accepted form destinations, retained archives and business/operations sign-off. Review volume, content throughput and contract notice periods before confirming the shutdown date. [Coexistence diagram](./diagrams/drupal-coexistence-migration.drawio)

## CMS budget

The budget covers **incremental infrastructure plus Payload Enterprise licence/support**. AI and development costs are excluded. AI remains an integration opportunity with its own separately calculated costs.

| Budget input                         | Planning position                                 |
| ------------------------------------ | ------------------------------------------------- |
| Current Drupal / Acquia              | TBC — detailed breakdown expected Monday          |
| Added GCP infrastructure             | About $500–1,150/month, or $6,000–13,800/year     |
| Payload Enterprise licence / support | TBC — vendor quote                                |
| Recurring CMS budget                 | Added infrastructure + Enterprise licence/support |

The infrastructure allowance assumes reuse of GKE and Cloudflare, Cloud SQL PostgreSQL HA with about 100 GB provisioned storage, a new GCS bucket and shared non-production capacity. It is a rough estimate, not a configured supplier quote. The [detailed budget](./poc-delivery-plan.md#infrastructure-and-enterprise-budget-comparison) contains the sizing and pricing assumptions.

Compare equivalent infrastructure and licence/support scope when the planned inputs arrive. The current app’s base infrastructure remains, so the new-CMS estimate is incremental. Allow for extra capacity as required and retained Drupal costs during coexistence. TBC values are planned follow-up inputs, not reasons to delay review of this proposal.

## Success after rollout

| Measure               | Target                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Drupal retirement     | 100% of agreed content migrated and accepted across all 27 scopes; no Drupal dependencies by implementation month 18 |
| Editor readiness      | At least 80% of active editors trained and able to complete core publishing tasks                                    |
| Publishing efficiency | Aim for 10% less publishing and reviewed translation time without reducing quality                                   |
| Service reliability   | At least 99% annual CMS availability; operations and recovery meet the OTS SLA                                       |
| Cost and maintenance  | Lower CMS running cost and maintenance effort than the current Drupal estate                                         |

The editorial improvement targets are provisional. Establish comparable Drupal baselines during implementation and review outcomes after each wave. Monitor CMS and public delivery separately, verify access controls, and compare response times and publishing freshness against an agreed baseline. Detailed performance targets follow measured workload and capacity.

## Technical meeting after approval

TA and PPO will meet Payload sales and a solutions engineer, with procurement support. Cover Enterprise cost/licence terms, feature availability and ONE’s questions on tenancy, workflows, Drupal import, environment promotion, GKE, security, recovery and AI data handling.

Expected outputs: written answers and actions, Enterprise scope and constraints, trial access, and a licence/support quote or due date. Itemize any optional AI charges separately. This meeting prepares the POC; it does not commit ONE to purchasing or deploying the platform.

## Evidence references

Vendor documentation establishes a starting point; the POC and technical meeting establish ONE-specific fit and exact Enterprise scope.

- Payload [plugin overview](https://payloadcms.com/docs/plugins/overview), [custom plugins](https://payloadcms.com/docs/plugins/build-your-own) and [plugin API](https://payloadcms.com/docs/plugins/plugin-api).
- Payload [Form Builder](https://payloadcms.com/docs/plugins/form-builder), [multi-tenancy](https://payloadcms.com/docs/plugins/multi-tenant), [Publishing Workflows](https://payloadcms.com/enterprise/publishing-workflows) and [Enterprise](https://payloadcms.com/enterprise).
- Payload [Enterprise AI](https://payloadcms.com/enterprise/enterprise-ai) and [MCP](https://payloadcms.com/docs/plugins/mcp). The AI page checked on 6 September 2026 marks image generation and writing assistance “Coming Soon”; do not treat advertised roadmap tools as available trial features.
- Directus [Enterprise](https://directus.com/enterprise) and [Environment Sync release documentation](https://directus.com/resources/12.3-release-notes).
- [Cloud SQL pricing](https://cloud.google.com/sql/pricing) and [Cloud Storage pricing](https://cloud.google.com/storage/pricing), used to inform the rough infrastructure allowance.

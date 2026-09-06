import { DefaultTemplate } from '@payloadcms/next/templates'
import { SetStepNav } from '@payloadcms/ui'
import { isValid, parseISO } from 'date-fns'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps, Payload } from 'payload'

import { contentLocaleLabels, contentLocales, type ContentLocale } from '../locales'

type EditorialCollection = 'news' | 'pages'
type WorkflowRequestState = 'approved' | 'changes-requested' | 'in-review' | 'translation-requested'

type WorkflowRequest = {
  readonly collection: EditorialCollection
  readonly id: number | string
  readonly requester: string
  readonly state: WorkflowRequestState
  readonly title: string
  readonly translationLocales: readonly string[]
  readonly updatedAt: string
}

type EditorialCoverage = {
  readonly collection: EditorialCollection
  readonly country?: string
  readonly id: number | string
  readonly locales: Readonly<Record<ContentLocale, boolean>>
  readonly scheduledFor?: string
  readonly title: string
  readonly workflowState: string
}

type EditorialCoverageBuilder = {
  collection: EditorialCollection
  country?: string
  id: number | string
  locales: Record<ContentLocale, boolean>
  scheduledFor?: string
  title: string
  workflowState: string
}

type EditorialActivity = {
  readonly action: string
  readonly actor: string
  readonly collection: EditorialCollection
  readonly createdAt: string
  readonly documentId: number | string
  readonly scheduledFor?: string
  readonly title: string
}

type EditorialActivityBuilder = {
  action: string
  actor: string
  collection: EditorialCollection
  createdAt: string
  documentId: number | string
  scheduledFor?: string
  title: string
}

function rolesForUser(user: unknown): readonly string[] {
  if (!user || typeof user !== 'object' || !('roles' in user)) return []
  const { roles } = user
  return Array.isArray(roles)
    ? roles.filter((role): role is string => typeof role === 'string')
    : []
}

function isWorkflowState(value: unknown): value is WorkflowRequestState {
  return (
    value === 'approved' ||
    value === 'changes-requested' ||
    value === 'in-review' ||
    value === 'translation-requested'
  )
}

function requestTitle(value: unknown): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Editorial content requires a title')
  }
  return value
}

function requestLocales(value: unknown): readonly string[] {
  return Array.isArray(value)
    ? value.filter((locale): locale is string => typeof locale === 'string')
    : []
}

function requestUpdatedAt(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function recordId(value: unknown): number | string | undefined {
  return typeof value === 'number' || typeof value === 'string' ? value : undefined
}

function countryName(value: unknown): string | undefined {
  if (!isRecord(value)) return undefined
  return typeof value.name === 'string' && value.name.length > 0 ? value.name : undefined
}

function workflowState(value: unknown): string {
  return typeof value === 'string' ? value : 'draft'
}

function optionalDate(value: unknown): string | undefined {
  return typeof value === 'string' && isValid(parseISO(value)) ? value : undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requestRequester(value: unknown): string {
  if (!isRecord(value)) return '—'

  const { email, name } = value
  if (typeof name === 'string' && name.length > 0) return name
  if (typeof email === 'string' && email.length > 0) return email
  return '—'
}

function requesterForState(
  state: WorkflowRequestState,
  doc: {
    readonly reviewRequestedBy?: unknown
    readonly reviewedBy?: unknown
    readonly translatedBy?: unknown
    readonly translationRequestedBy?: unknown
  },
): string {
  if (state === 'translation-requested') return requestRequester(doc.translationRequestedBy)
  if (state === 'in-review') return requestRequester(doc.translatedBy ?? doc.reviewRequestedBy)
  return requestRequester(doc.reviewedBy)
}

function formatRequestDate(value: string): string {
  const date = parseISO(value)
  if (!isValid(date)) return '—'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date)
}

function contentHref(
  adminPath: string,
  collection: EditorialCollection,
  id: number | string,
): string {
  return `${adminPath}/collections/${collection}/${id}`
}

async function requestsForState(
  payload: Payload,
  state: WorkflowRequestState,
  user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>,
): Promise<readonly WorkflowRequest[]> {
  const collections: readonly EditorialCollection[] = ['news', 'pages']
  const requests = await Promise.all(
    collections.map(async (collection) => {
      const result = await payload.find({
        collection,
        depth: 1,
        draft: true,
        fallbackLocale: false,
        limit: 20,
        locale: 'en',
        overrideAccess: false,
        select: {
          reviewRequestedBy: true,
          reviewedBy: true,
          title: true,
          translatedBy: true,
          translationLocales: true,
          translationRequestedBy: true,
          updatedAt: true,
          workflowState: true,
        },
        sort: '-updatedAt',
        user,
        where: { workflowState: { equals: state } },
      })

      return result.docs.flatMap((doc) => {
        if (!isWorkflowState(doc.workflowState)) return []
        return [
          {
            collection,
            id: doc.id,
            requester: requesterForState(doc.workflowState, doc),
            state: doc.workflowState,
            title: requestTitle(doc.title),
            translationLocales: requestLocales(doc.translationLocales),
            updatedAt: requestUpdatedAt(doc.updatedAt),
          },
        ]
      })
    }),
  )

  return requests.flat().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

async function coverageRecordsForLocale(
  payload: Payload,
  collection: EditorialCollection,
  locale: ContentLocale,
  user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>,
): Promise<readonly unknown[]> {
  if (collection === 'news') {
    const result = await payload.find({
      collection,
      depth: 1,
      draft: true,
      fallbackLocale: false,
      limit: 24,
      locale,
      overrideAccess: false,
      select: {
        country: true,
        scheduledFor: true,
        title: true,
        workflowState: true,
      },
      sort: '-updatedAt',
      user,
    })
    return result.docs
  }

  const result = await payload.find({
    collection,
    depth: 0,
    draft: true,
    fallbackLocale: false,
    limit: 24,
    locale,
    overrideAccess: false,
    select: { scheduledFor: true, title: true, workflowState: true },
    sort: '-updatedAt',
    user,
  })
  return result.docs
}

async function editorialCoverage(
  payload: Payload,
  user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>,
): Promise<readonly EditorialCoverage[]> {
  const collections: readonly EditorialCollection[] = ['news', 'pages']
  const requests = await Promise.all(
    collections.flatMap((collection) =>
      contentLocales.map(async (locale) => ({
        collection,
        locale,
        records: await coverageRecordsForLocale(payload, collection, locale, user),
      })),
    ),
  )
  const coverage = new Map<string, EditorialCoverageBuilder>()

  for (const request of requests) {
    for (const document of request.records) {
      if (!isRecord(document)) continue
      const id = recordId(document.id)
      if (id === undefined) continue
      const key = `${request.collection}-${id}`
      const existing = coverage.get(key)
      const title =
        typeof document.title === 'string' && document.title.length > 0 ? document.title : undefined
      if (!existing && (request.locale !== 'en' || !title)) continue
      const next = existing ?? {
        collection: request.collection,
        id,
        locales: { en: false, es: false, ja: false },
        title: requestTitle(title),
        workflowState: workflowState(document.workflowState),
      }
      const country = countryName(document.country)
      const scheduledFor = optionalDate(document.scheduledFor)
      if (country) next.country = country
      if (scheduledFor) next.scheduledFor = scheduledFor
      next.locales[request.locale] = title !== undefined
      if (request.locale === 'en' && title) next.title = title
      coverage.set(key, next)
    }
  }

  return [...coverage.values()].sort((left, right) => left.title.localeCompare(right.title))
}

function actorForActivity(value: unknown): string {
  return requestRequester(value)
}

async function recentActivities(
  payload: Payload,
  user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>,
): Promise<readonly EditorialActivity[]> {
  const result = await payload.find({
    collection: 'editorial-activities',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      action: true,
      actor: true,
      collection: true,
      createdAt: true,
      documentId: true,
      scheduledFor: true,
      title: true,
    },
    sort: '-createdAt',
    user,
  })

  return result.docs.flatMap((document) => {
    if (!isRecord(document)) return []
    const collection = document.collection
    const documentId = recordId(document.documentId)
    if ((collection !== 'news' && collection !== 'pages') || documentId === undefined) return []
    const activity: EditorialActivityBuilder = {
      action: stringValue(document.action),
      actor: actorForActivity(document.actor),
      collection,
      createdAt: stringValue(document.createdAt),
      documentId,
      title: requestTitle(document.title),
    }
    const scheduledFor = optionalDate(document.scheduledFor)
    if (scheduledFor) activity.scheduledFor = scheduledFor
    return [activity]
  })
}

function statesForRoles(roles: readonly string[]): readonly WorkflowRequestState[] {
  if (roles.includes('admin')) {
    return ['translation-requested', 'in-review', 'changes-requested', 'approved']
  }

  return [
    ...(roles.includes('translator') ? (['translation-requested'] as const) : []),
    ...(roles.includes('reviewer') ? (['in-review'] as const) : []),
    ...(roles.includes('editor') ? (['changes-requested'] as const) : []),
    ...(roles.includes('publisher') ? (['approved'] as const) : []),
  ]
}

function stateLabel(request: WorkflowRequest): string {
  if (request.state === 'translation-requested') {
    const languages = request.translationLocales.join(', ')
    return languages ? `Translation requested: ${languages}` : 'Translation requested'
  }
  if (request.state === 'in-review') return 'Ready for review'
  if (request.state === 'changes-requested') return 'Changes requested'
  return 'Ready to publish'
}

function activityLabel(activity: EditorialActivity): string {
  const labels: Record<string, string> = {
    approved: 'Approved for publishing',
    'changes-requested': 'Changes requested',
    created: 'Created',
    published: 'Published',
    'review-requested': 'Review requested',
    scheduled: 'Scheduled for publication',
    'translation-requested': 'Translation requested',
    'translations-submitted': 'Translations submitted for review',
  }
  return labels[activity.action] ?? 'Updated'
}

export async function WorkflowInbox({
  payload,
  user,
}: {
  readonly payload: Payload
  readonly user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>
}) {
  const states = statesForRoles(rolesForUser(user))
  const roles = rolesForUser(user)
  const [requests, coverage, activities] = await Promise.all([
    Promise.all(states.map((state) => requestsForState(payload, state, user))).then((items) =>
      items.flat(),
    ),
    editorialCoverage(payload, user),
    roles.includes('admin') ? recentActivities(payload, user) : Promise.resolve([]),
  ])
  const adminPath = payload.config.routes.admin

  return (
    <section aria-labelledby="workflow-inbox-title" className="workflow-inbox">
      <div className="workflow-inbox__heading">
        <div>
          <h2 id="workflow-inbox-title">My requests</h2>
        </div>
        <p>Translation, review, revision, and publishing work currently waiting for your role.</p>
      </div>
      {requests.length > 0 ? (
        <div className="workflow-inbox__table-wrap">
          <table className="workflow-inbox__table">
            <thead>
              <tr>
                <th scope="col">Content</th>
                <th scope="col">Current action</th>
                <th scope="col">Requested by</th>
                <th scope="col">Translation targets</th>
                <th scope="col">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={`${request.collection}-${request.id}-${request.state}`}>
                  <td>
                    <a href={contentHref(adminPath, request.collection, request.id)}>
                      {request.title}
                    </a>
                    <small>{request.collection === 'news' ? 'News story' : 'Page'}</small>
                  </td>
                  <td>{stateLabel(request)}</td>
                  <td>{request.requester}</td>
                  <td>
                    {request.translationLocales.length > 0
                      ? request.translationLocales.join(', ')
                      : '—'}
                  </td>
                  <td>
                    <time dateTime={request.updatedAt}>{formatRequestDate(request.updatedAt)}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="workflow-inbox__empty">No workflow requests are waiting for you.</p>
      )}
      <section aria-labelledby="workflow-coverage-title" className="workflow-inbox__section">
        <div className="workflow-inbox__section-heading">
          <div>
            <h3 id="workflow-coverage-title">Editorial coverage</h3>
            <p>Translation availability and release readiness across the content you can access.</p>
          </div>
          <p className="workflow-inbox__key">
            <span
              aria-hidden="true"
              className="workflow-inbox__locale workflow-inbox__locale--ready"
            />
            Present
            <span aria-hidden="true" className="workflow-inbox__locale" />
            Missing
          </p>
        </div>
        {coverage.length > 0 ? (
          <div className="workflow-inbox__table-wrap">
            <table className="workflow-inbox__table workflow-inbox__coverage-table">
              <thead>
                <tr>
                  <th scope="col">Content</th>
                  {contentLocales.map((locale) => (
                    <th key={locale} scope="col">
                      {contentLocaleLabels[locale]}
                    </th>
                  ))}
                  <th scope="col">Workflow</th>
                  <th scope="col">Release</th>
                </tr>
              </thead>
              <tbody>
                {coverage.map((item) => (
                  <tr key={`${item.collection}-${item.id}`}>
                    <td>
                      <a href={contentHref(adminPath, item.collection, item.id)}>{item.title}</a>
                      <small>
                        {item.collection === 'news' ? 'News story' : 'Page'}
                        {item.country ? ` · ${item.country}` : ''}
                      </small>
                    </td>
                    {contentLocales.map((locale) => (
                      <td key={locale}>
                        <span
                          aria-hidden="true"
                          className={`workflow-inbox__locale${item.locales[locale] ? ' workflow-inbox__locale--ready' : ''}`}
                        />
                        <span className="workflow-inbox__visually-hidden">
                          {item.locales[locale]
                            ? `${contentLocaleLabels[locale]} content present`
                            : `${contentLocaleLabels[locale]} content missing`}
                        </span>
                      </td>
                    ))}
                    <td>{item.workflowState.replaceAll('-', ' ')}</td>
                    <td>
                      {item.scheduledFor ? (
                        <time dateTime={item.scheduledFor}>
                          Scheduled {formatRequestDate(item.scheduledFor)}
                        </time>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="workflow-inbox__empty">No editorial content is available to summarize.</p>
        )}
      </section>
      {roles.includes('admin') ? (
        <section aria-labelledby="workflow-activity-title" className="workflow-inbox__section">
          <div className="workflow-inbox__section-heading">
            <div>
              <h3 id="workflow-activity-title">Recent activity</h3>
              <p>Every handoff, approval, scheduled release, and publication in one trace.</p>
            </div>
          </div>
          {activities.length > 0 ? (
            <ol className="workflow-inbox__activity-list">
              {activities.map((activity) => (
                <li key={`${activity.collection}-${activity.documentId}-${activity.createdAt}`}>
                  <div>
                    <a href={contentHref(adminPath, activity.collection, activity.documentId)}>
                      {activity.title}
                    </a>
                    <p>
                      {activityLabel(activity)}
                      {activity.scheduledFor
                        ? ` · ${formatRequestDate(activity.scheduledFor)}`
                        : ''}
                    </p>
                  </div>
                  <p>
                    {activity.actor} ·{' '}
                    <time dateTime={activity.createdAt}>
                      {formatRequestDate(activity.createdAt)}
                    </time>
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="workflow-inbox__empty">
              Activity will appear after the next editorial handoff.
            </p>
          )}
        </section>
      ) : null}
    </section>
  )
}

export function WorkflowInboxView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const {
    locale,
    permissions,
    req: { i18n, payload, user },
    visibleEntities,
  } = initPageResult
  const adminPath = payload.config.routes.admin
  const optionalTemplateProps = {
    ...(locale === undefined ? {} : { locale }),
    ...(params === undefined ? {} : { params }),
    ...(searchParams === undefined ? {} : { searchParams }),
  }

  if (!user || !permissions.canAccessAdmin) redirect(`${adminPath}/unauthorized`)

  return (
    <DefaultTemplate
      i18n={i18n}
      payload={payload}
      permissions={permissions}
      user={user}
      visibleEntities={visibleEntities}
      viewType="workflow"
      {...optionalTemplateProps}
    >
      <SetStepNav nav={[{ label: 'My requests' }]} />
      <div className="workflow-inbox__view">
        <WorkflowInbox payload={payload} user={user} />
      </div>
    </DefaultTemplate>
  )
}

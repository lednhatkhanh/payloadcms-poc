import { isValid, parseISO } from 'date-fns'
import { sum } from 'es-toolkit'
import type { TaskConfig } from 'payload'

type ScheduledPublishingTask = {
  readonly input: Record<string, never>
  readonly output: { readonly published: number }
}

type EditorialCollection = 'news' | 'pages'

function scheduledForValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  return isValid(parseISO(value)) ? value : undefined
}

export const publishScheduledContent: TaskConfig<ScheduledPublishingTask> = {
  handler: async ({ req }) => {
    const collections: readonly EditorialCollection[] = ['news', 'pages']
    const now = new Date().toISOString()
    const publishedByCollection = await Promise.all(
      collections.map(async (collection) => {
        const result = await req.payload.find({
          collection,
          depth: 0,
          draft: true,
          limit: 100,
          overrideAccess: true,
          select: { scheduledFor: true, workflowState: true },
          where: {
            and: [
              { _status: { equals: 'draft' } },
              { workflowState: { equals: 'approved' } },
              { scheduledFor: { less_than_equal: now } },
            ],
          },
        })

        const publicationResults = await Promise.all(
          result.docs.map(async (document) => {
            const scheduledFor = scheduledForValue(document.scheduledFor)
            if (!scheduledFor) return false

            await req.payload.update({
              collection,
              context: { ...req.context, scheduledPublishing: true },
              data:
                collection === 'news'
                  ? { _status: 'published', publishedAt: scheduledFor, scheduledFor: null }
                  : { _status: 'published', scheduledFor: null },
              draft: false,
              id: document.id,
              overrideAccess: true,
              req,
            })
            return true
          }),
        )
        return publicationResults.filter(Boolean).length
      }),
    )
    const published = sum(publishedByCollection)

    return { output: { published } }
  },
  label: 'Publish scheduled content',
  schedule: [{ cron: '* * * * *', queue: 'scheduled-publication' }],
  slug: 'publish-scheduled-content',
}

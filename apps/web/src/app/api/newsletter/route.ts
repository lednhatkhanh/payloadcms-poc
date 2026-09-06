import { flattenFormErrors, newsletterInputSchema, type FormResult } from '@repo/contracts/forms'
import config from '@repo/payload-config'
import { getPayload } from 'payload'

function isHoneypot(value: unknown): boolean {
  return typeof value === 'object' && value !== null && 'website' in value && Boolean(value.website)
}

const success = { ok: true, message: 'You are on the list. Watch your inbox.' } satisfies FormResult

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json()
  if (isHoneypot(body)) return Response.json(success)
  const result = newsletterInputSchema.safeParse(body)
  if (!result.success) {
    return Response.json(
      {
        ok: false,
        message: 'Check the highlighted fields.',
        fieldErrors: flattenFormErrors(result.error),
      } satisfies FormResult,
      { status: 422 },
    )
  }
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'newsletter-signups',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: result.data.email } },
  })
  if (existing.totalDocs > 0) return Response.json(success)
  await payload.create({
    collection: 'newsletter-signups',
    data: { consent: result.data.consent, email: result.data.email, source: result.data.source },
    overrideAccess: true,
  })
  return Response.json(success)
}

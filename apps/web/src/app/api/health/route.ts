import config from '@repo/payload-config'
import { getPayload } from 'payload'

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })
  await payload.find({ collection: 'news', depth: 0, limit: 1, overrideAccess: true })
  return Response.json({ status: 'ok' })
}

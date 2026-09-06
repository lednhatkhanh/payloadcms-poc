import { timingSafeEqual } from 'node:crypto'

import {
  cacheInvalidationToken,
  isPublicCacheTag,
  type PublicCacheTag,
} from '@repo/payload-config/revalidation'
import { uniq } from 'es-toolkit'
import { revalidateTag } from 'next/cache'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAuthorized(request: Request): boolean {
  const authorization = request.headers.get('authorization')
  const expected = `Bearer ${cacheInvalidationToken}`
  if (!authorization || authorization.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(authorization), Buffer.from(expected))
}

function revalidationTags(value: unknown): readonly PublicCacheTag[] | undefined {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isPublicCacheTag)) {
    return undefined
  }

  return uniq(value)
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return new Response('Unauthorized.', { status: 401 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response('Invalid JSON body.', { status: 400 })
  }

  const tags = isRecord(body) ? revalidationTags(body.tags) : undefined
  if (!tags) return new Response('Invalid revalidation tags.', { status: 400 })

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 })
  }

  return Response.json({ revalidated: true, tags })
}

import { getPublicMediaFile } from '@/lib/content'

export async function GET(_request: Request, context: RouteContext<'/api/media/[filename]'>) {
  const { filename } = await context.params
  const media = await getPublicMediaFile(filename)
  if (!media) return new Response(null, { status: 404 })

  return new Response(media.body, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': media.contentType,
    },
  })
}

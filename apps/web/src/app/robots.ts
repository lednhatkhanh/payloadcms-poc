import { publicEnvironment } from '@repo/contracts/env'
import type { MetadataRoute } from 'next'

import { getSeoSettings } from '@/lib/content'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings('en')
  return {
    rules: settings.allowIndexing
      ? { allow: '/', disallow: ['/admin/', '/api/'], userAgent: '*' }
      : { disallow: '/', userAgent: '*' },
    sitemap: new URL('/sitemap.xml', publicEnvironment.webUrl).toString(),
  }
}

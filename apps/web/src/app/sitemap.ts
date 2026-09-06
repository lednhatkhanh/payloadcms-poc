import { publicEnvironment } from '@repo/contracts/env'
import { contentLocales, type ContentLocale } from '@repo/payload-config/locales'
import { isValid, parseISO } from 'date-fns'
import type { MetadataRoute } from 'next'

import { getSeoSettings, getSitemapContent } from '@/lib/content'

function absoluteUrl(path: string): string {
  return new URL(path, publicEnvironment.webUrl).toString()
}

function localePath(locale: ContentLocale, path: string): string {
  return `/${locale}${path === '/' ? '' : path}`
}

function languageAlternates(
  locales: readonly ContentLocale[],
  path: string,
): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localePath(locale, path))]),
  )
}

function lastModified(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const date = parseISO(value)
  return isValid(date) ? date : undefined
}

function entry(
  path: string,
  locales: readonly ContentLocale[],
  updatedAt: string | undefined,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const updated = lastModified(updatedAt)
  return {
    alternates: { languages: languageAlternates(locales, path) },
    changeFrequency,
    ...(updated ? { lastModified: updated } : {}),
    priority,
    url: absoluteUrl(localePath(locales[0] ?? 'en', path)),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings('en')
  if (!settings.allowIndexing) return []

  const content = await getSitemapContent()
  return [
    entry('/', contentLocales, undefined, 'weekly', 1),
    entry('/news', contentLocales, undefined, 'weekly', 0.8),
    entry('/locations', contentLocales, undefined, 'monthly', 0.7),
    ...content.pages.map((page) => entry(page.path, page.locales, page.updatedAt, 'monthly', 0.7)),
    ...content.news.map((story) =>
      entry(
        `/news/${story.slug}${story.countryCode ? `?country=${encodeURIComponent(story.countryCode)}` : ''}`,
        story.locales,
        story.updatedAt,
        'weekly',
        0.6,
      ),
    ),
    ...content.locations.map((location) =>
      entry(`/locations/${location.slug}`, location.locales, location.updatedAt, 'monthly', 0.6),
    ),
  ]
}

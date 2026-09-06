import 'server-only'

import { isContentLocale, type ContentLocale } from '@repo/payload-config/locales'
import { locale as routeLocale } from 'next/root-params'

export async function getSiteLocale(): Promise<ContentLocale> {
  const locale = await routeLocale()
  if (!isContentLocale(locale)) throw new Error('A canonical site locale is required')
  return locale
}

export function localeTag(locale: ContentLocale): string {
  return locale === 'ja' ? 'ja-JP' : locale === 'es' ? 'es-ES' : 'en-US'
}

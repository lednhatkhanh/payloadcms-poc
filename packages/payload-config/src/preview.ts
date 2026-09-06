import { createHmac } from 'node:crypto'

import { serverEnvironment } from '@repo/contracts/env'

import { defaultContentLocale, isContentLocale } from './locales'

export const pagePreviewToken = createHmac('sha256', serverEnvironment.PAYLOAD_SECRET)
  .update('dispatch-page-preview')
  .digest('hex')

export const newsPreviewToken = createHmac('sha256', serverEnvironment.PAYLOAD_SECRET)
  .update('dispatch-news-preview')
  .digest('hex')

export function pagePreviewUrl(id: number | string, locale: string): string {
  const url = new URL('/api/preview', serverEnvironment.NEXT_PUBLIC_WEB_URL)
  url.searchParams.set('id', String(id))
  url.searchParams.set('locale', isContentLocale(locale) ? locale : defaultContentLocale)
  url.searchParams.set('token', pagePreviewToken)
  return url.toString()
}

export function newsPreviewUrl(id: number | string, locale: string): string {
  const url = new URL('/api/preview', serverEnvironment.NEXT_PUBLIC_WEB_URL)
  url.searchParams.set('id', String(id))
  url.searchParams.set('kind', 'news')
  url.searchParams.set('locale', isContentLocale(locale) ? locale : defaultContentLocale)
  url.searchParams.set('token', newsPreviewToken)
  return url.toString()
}

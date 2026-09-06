import type { ContentLocale } from '@repo/payload-config/locales'

export function localizedHref(locale: ContentLocale, href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (href === '/') return `/${locale}`
  if (href.startsWith('/#') || href.startsWith('/?')) return `/${locale}${href.slice(1)}`
  return `/${locale}${href}`
}

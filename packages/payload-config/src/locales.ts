export const contentLocales = ['en', 'ja', 'es'] as const

export type ContentLocale = (typeof contentLocales)[number]

export const defaultContentLocale: ContentLocale = 'en'

export const contentLocaleCookie = 'dispatch-locale'

export const contentLocaleCookieMaxAge = 60 * 60 * 24 * 365

export const contentLocaleLabels: Record<ContentLocale, string> = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
}

export function isContentLocale(value: string | undefined): value is ContentLocale {
  return value === 'en' || value === 'ja' || value === 'es'
}

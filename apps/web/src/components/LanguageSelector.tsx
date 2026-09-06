'use client'

import {
  contentLocaleCookie,
  contentLocaleCookieMaxAge,
  contentLocaleLabels,
  contentLocales,
  isContentLocale,
} from '@repo/payload-config/locales'
import { SelectField } from '@repo/ui/form'
import { usePathname } from 'next/navigation'
import type { Key } from 'react'

function localePath(locale: string, pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const pageSegments = isContentLocale(segments[0]) ? segments.slice(1) : segments
  return `/${locale}${pageSegments.length > 0 ? `/${pageSegments.join('/')}` : ''}`
}

function selectedLocale(pathname: string): string | undefined {
  const locale = pathname.split('/').filter(Boolean)[0]
  return isContentLocale(locale) ? locale : undefined
}

export function LanguageSelector() {
  const pathname = usePathname()
  const locale = selectedLocale(pathname)
  if (!locale) return null

  function changeLanguage(key: Key | null) {
    if (typeof key !== 'string' || !isContentLocale(key)) return
    document.cookie = `${contentLocaleCookie}=${key}; Max-Age=${contentLocaleCookieMaxAge}; Path=/; SameSite=Lax`
    window.location.replace(localePath(key, pathname))
  }

  return (
    <SelectField
      label="Language"
      onChange={changeLanguage}
      options={contentLocales.map((optionLocale) => ({
        label: contentLocaleLabels[optionLocale],
        value: optionLocale,
      }))}
      value={locale}
      size="compact"
    />
  )
}

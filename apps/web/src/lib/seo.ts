import 'server-only'

import { publicEnvironment } from '@repo/contracts/env'
import { contentLocales, type ContentLocale } from '@repo/payload-config/locales'
import type { Metadata } from 'next'

import { localeTag } from '@/lib/locale'
import type { MediaReference, SeoMetadata, SeoSettingsContent } from '@/lib/content'

type PageMetadataInput = {
  readonly description: string
  readonly pageImage?: MediaReference | undefined
  readonly locale: ContentLocale
  readonly noIndex?: boolean
  readonly path: string
  readonly seo?: SeoMetadata | undefined
  readonly settings: SeoSettingsContent
  readonly title: string
}

function localizedPath(locale: ContentLocale, path: string): string {
  return `/${locale}${path === '/' ? '' : path}`
}

function absoluteUrl(path: string): string {
  return new URL(path, publicEnvironment.webUrl).toString()
}

function localizedAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    contentLocales.map((locale) => [localeTag(locale), absoluteUrl(localizedPath(locale, path))]),
  )
}

function socialImageUrl(image: MediaReference | undefined): string | undefined {
  return image ? absoluteUrl(image.url) : undefined
}

export function buildPageMetadata({
  description,
  pageImage,
  locale,
  noIndex = false,
  path,
  seo,
  settings,
  title,
}: PageMetadataInput): Metadata {
  const pageTitle = seo?.title || title
  const pageDescription = seo?.description || description
  const socialImage = socialImageUrl(seo?.image ?? pageImage ?? settings.defaultSocialImage)
  const canonical = absoluteUrl(localizedPath(locale, path))
  const shouldIndex = settings.allowIndexing && !noIndex

  return {
    alternates: {
      canonical,
      languages: localizedAlternates(path),
    },
    description: pageDescription,
    openGraph: {
      description: pageDescription,
      ...(socialImage ? { images: [{ alt: pageTitle, url: socialImage }] } : {}),
      locale: localeTag(locale),
      siteName: settings.siteName,
      title: pageTitle,
      type: 'website',
      url: canonical,
    },
    robots: shouldIndex ? { follow: true, index: true } : { follow: false, index: false },
    title: pageTitle,
    twitter: {
      card: 'summary_large_image',
      description: pageDescription,
      ...(socialImage ? { images: [socialImage] } : {}),
      ...(settings.twitterSite ? { site: settings.twitterSite } : {}),
      title: pageTitle,
    },
  }
}

export function buildSiteMetadata(settings: SeoSettingsContent): Metadata {
  const shouldIndex = settings.allowIndexing
  return {
    description: settings.defaultDescription,
    metadataBase: new URL(publicEnvironment.webUrl),
    openGraph: {
      description: settings.defaultDescription,
      ...(settings.defaultSocialImage
        ? {
            images: [
              { alt: settings.defaultTitle, url: absoluteUrl(settings.defaultSocialImage.url) },
            ],
          }
        : {}),
      siteName: settings.siteName,
      title: settings.defaultTitle,
      type: 'website',
    },
    robots: shouldIndex ? { follow: true, index: true } : { follow: false, index: false },
    title: { default: settings.defaultTitle, template: `%s — ${settings.siteName}` },
    twitter: {
      card: 'summary_large_image',
      description: settings.defaultDescription,
      ...(settings.defaultSocialImage
        ? { images: [absoluteUrl(settings.defaultSocialImage.url)] }
        : {}),
      ...(settings.twitterSite ? { site: settings.twitterSite } : {}),
      title: settings.defaultTitle,
    },
    ...(settings.googleSiteVerification
      ? { verification: { google: settings.googleSiteVerification } }
      : {}),
  }
}

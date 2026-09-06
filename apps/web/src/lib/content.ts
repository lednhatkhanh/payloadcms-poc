import 'server-only'

import config from '@repo/payload-config'
import { mediaDirectory } from '@repo/payload-config/paths'
import type { News, Page } from '@repo/payload-config/types'
import { contentLocales, type ContentLocale } from '@repo/payload-config/locales'
import { serverEnvironment } from '@repo/contracts/env'
import { compact } from 'es-toolkit'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

export interface HomepageContent {
  readonly aboutBody: string
  readonly aboutTitle: string
  readonly contactBody: string
  readonly contactTitle: string
  readonly eyebrow: string
  readonly heroBody: string
  readonly hero?: MediaReference
  readonly heroTitle: string
  readonly newsletterBody: string
  readonly newsletterTitle: string
  readonly primaryCta: { readonly href: string; readonly label: string }
  readonly secondaryCta: { readonly href: string; readonly label: string }
  readonly seo?: SeoMetadata
}

export interface NewsSummary {
  readonly category: string
  readonly country?: NewsCountry
  readonly excerpt: string
  readonly hero: MediaReference
  readonly publishedAt: string
  readonly slug: string
  readonly title: string
  readonly seo?: SeoMetadata
}

export interface NewsArticle extends NewsSummary {
  readonly body: News['body']
}

export interface NewsCountry {
  readonly code: string
  readonly name: string
}

export interface CountryFilter {
  readonly code: string
  readonly name: string
}

export interface ManagedPage {
  readonly id: number
  readonly layout: Page['layout']
  readonly lead: string
  readonly slug: string
  readonly title: string
  readonly seo?: SeoMetadata
}

type ManagedPageLookup = Pick<Page, 'id' | 'layout' | 'lead' | 'meta' | 'slug' | 'title'>
export type ManagedPageSummary = Pick<ManagedPage, 'lead' | 'slug' | 'title'>

export interface MediaReference {
  readonly alt: string
  readonly url: string
}

export interface SeoMetadata {
  readonly description?: string
  readonly image?: MediaReference
  readonly title?: string
}

export interface SeoSettingsContent {
  readonly allowIndexing: boolean
  readonly defaultDescription: string
  readonly defaultSocialImage?: MediaReference
  readonly defaultTitle: string
  readonly googleSiteVerification?: string
  readonly siteName: string
  readonly twitterSite?: string
}

export interface SitemapContent {
  readonly locations: readonly SitemapLocation[]
  readonly news: readonly SitemapNews[]
  readonly pages: readonly SitemapPage[]
}

export interface SitemapLocation {
  readonly locales: readonly ContentLocale[]
  readonly slug: string
  readonly updatedAt?: string | undefined
}

export interface SitemapNews {
  readonly countryCode?: string
  readonly locales: readonly ContentLocale[]
  readonly slug: string
  readonly updatedAt?: string | undefined
}

export interface SitemapPage {
  readonly locales: readonly ContentLocale[]
  readonly path: string
  readonly updatedAt?: string | undefined
}

export type LocationService = 'logistics-solutions' | 'ocean-freight'

export interface LocationSummary {
  readonly description: string
  readonly hero?: { readonly alt: string; readonly url: string }
  readonly serviceTags: readonly LocationService[]
  readonly slug: string
  readonly title: string
  readonly seo?: SeoMetadata
}

export interface LocationRecord extends LocationSummary {
  readonly city: string
  readonly countryName: string
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function mediaValue(value: unknown): MediaReference | undefined {
  if (typeof value !== 'object' || value === null || !('url' in value)) return undefined
  const url = stringValue(value.url)
  if (!url) return undefined
  const filename = 'filename' in value ? stringValue(value.filename) : ''
  return {
    alt: 'alt' in value ? stringValue(value.alt) : '',
    url: filename
      ? `/api/media/${encodeURIComponent(filename)}`
      : new URL(url, serverEnvironment.NEXT_PUBLIC_CMS_URL).toString(),
  }
}

function seoValue(value: unknown): SeoMetadata | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const record = value as Record<string, unknown>
  const description = stringValue(record.description)
  const image = mediaValue(record.image)
  const title = stringValue(record.title)
  if (!description && !image && !title) return undefined
  return {
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(title ? { title } : {}),
  }
}

function countryValue(value: unknown): NewsCountry | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const record = value as Record<string, unknown>
  const code = stringValue(record.code)
  const name = stringValue(record.name)
  return code && name ? { code, name } : undefined
}

function locationServiceValues(value: unknown): readonly LocationService[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) =>
    item === 'ocean-freight' || item === 'logistics-solutions' ? [item] : [],
  )
}

function mapSummary(doc: Record<string, unknown>): NewsSummary | undefined {
  const slug = stringValue(doc.slug)
  const title = stringValue(doc.title)
  const hero = mediaValue(doc.heroMedia)
  const country = countryValue(doc.country)
  const seo = seoValue(doc.meta)
  if (!slug || !title || !hero) return undefined
  return {
    category: stringValue(doc.category),
    ...(country ? { country } : {}),
    excerpt: stringValue(doc.excerpt),
    hero,
    publishedAt: stringValue(doc.publishedAt),
    slug,
    title,
    ...(seo ? { seo } : {}),
  }
}

export function newsHref(article: Pick<NewsSummary, 'country' | 'slug'>): string {
  return article.country
    ? `/news/${article.slug}?country=${encodeURIComponent(article.country.code)}`
    : `/news/${article.slug}`
}

function supportsLocale(value: unknown, locale: ContentLocale): boolean {
  return Array.isArray(value) && value.includes(locale)
}

async function countryIdForCode(code: string, locale: ContentLocale): Promise<number | undefined> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'countries',
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: { code: true, supportedLocales: true },
    where: { code: { equals: code } },
  })
  const country = result.docs[0]
  return country && supportsLocale(country.supportedLocales, locale) ? country.id : undefined
}

async function countryIdsForLocale(locale: ContentLocale): Promise<readonly number[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'countries',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    limit: 12,
    locale,
    overrideAccess: false,
    select: { supportedLocales: true },
  })
  return result.docs.flatMap((country) =>
    supportsLocale(country.supportedLocales, locale) ? [country.id] : [],
  )
}

export async function getCountryFilters(locale: ContentLocale): Promise<readonly CountryFilter[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('countries', `countries:${locale}`)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'countries',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    limit: 12,
    locale,
    overrideAccess: false,
    select: { code: true, name: true, supportedLocales: true },
    sort: 'name',
  })
  return result.docs.flatMap((country) => {
    const code = stringValue(country.code)
    const name = stringValue(country.name)
    return code && name && supportsLocale(country.supportedLocales, locale) ? [{ code, name }] : []
  })
}

function mapLocationSummary(doc: Record<string, unknown>): LocationSummary | undefined {
  const slug = stringValue(doc.slug)
  const title = stringValue(doc.title)
  const serviceTags = locationServiceValues(doc.serviceTags)
  if (!slug || !title || serviceTags.length === 0) return undefined
  const hero = mediaValue(doc.heroMedia)
  const seo = seoValue(doc.meta)
  return {
    description: stringValue(doc.description),
    ...(hero ? { hero } : {}),
    serviceTags,
    slug,
    title,
    ...(seo ? { seo } : {}),
  }
}

function mapManagedPage(
  page: Pick<Page, 'id' | 'layout' | 'lead' | 'meta' | 'slug' | 'title'>,
): ManagedPage | undefined {
  const lead = stringValue(page.lead)
  if (!lead || !Array.isArray(page.layout) || page.layout.length === 0) return undefined
  const seo = seoValue(page.meta)
  return {
    id: page.id,
    layout: page.layout,
    lead,
    slug: page.slug,
    title: page.title,
    ...(seo ? { seo } : {}),
  }
}

function mapManagedPageSummary(
  page: Pick<Page, 'lead' | 'slug' | 'title'>,
): ManagedPageSummary | undefined {
  const lead = stringValue(page.lead)
  if (!lead) return undefined
  return {
    lead,
    slug: page.slug,
    title: page.title,
  }
}

function pageParentId(page: Pick<Page, 'parent'>): number | undefined {
  const parent = page.parent
  if (typeof parent === 'number') return parent
  return parent?.id
}

export async function getHomepage(locale: ContentLocale): Promise<HomepageContent> {
  'use cache'
  cacheLife('hours')
  cacheTag('homepage', `homepage:${locale}`)
  const payload = await getPayload({ config })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    overrideAccess: false,
    select: {
      aboutBody: true,
      aboutTitle: true,
      contactBody: true,
      contactTitle: true,
      eyebrow: true,
      heroBody: true,
      heroMedia: true,
      heroTitle: true,
      newsletterBody: true,
      newsletterTitle: true,
      meta: true,
      primaryCta: true,
      secondaryCta: true,
    },
  })

  const hero = mediaValue(homepage.heroMedia)
  const seo = seoValue(homepage.meta)
  return {
    aboutBody: homepage.aboutBody,
    aboutTitle: homepage.aboutTitle,
    contactBody: homepage.contactBody,
    contactTitle: homepage.contactTitle,
    eyebrow: homepage.eyebrow,
    heroBody: homepage.heroBody,
    ...(hero ? { hero } : {}),
    heroTitle: homepage.heroTitle,
    newsletterBody: homepage.newsletterBody,
    newsletterTitle: homepage.newsletterTitle,
    primaryCta: homepage.primaryCta,
    secondaryCta: homepage.secondaryCta,
    ...(seo ? { seo } : {}),
  }
}

export async function getSeoSettings(locale: ContentLocale): Promise<SeoSettingsContent> {
  'use cache'
  cacheLife('hours')
  cacheTag('seo', `seo:${locale}`)
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'seo-settings',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    overrideAccess: false,
    select: {
      allowIndexing: true,
      defaultDescription: true,
      defaultSocialImage: true,
      defaultTitle: true,
      googleSiteVerification: true,
      siteName: true,
      twitterSite: true,
    },
  })

  const defaultSocialImage = mediaValue(settings.defaultSocialImage)
  const googleSiteVerification = stringValue(settings.googleSiteVerification)
  const twitterSite = stringValue(settings.twitterSite)
  return {
    allowIndexing: settings.allowIndexing,
    defaultDescription: settings.defaultDescription,
    ...(defaultSocialImage ? { defaultSocialImage } : {}),
    defaultTitle: settings.defaultTitle,
    ...(googleSiteVerification ? { googleSiteVerification } : {}),
    siteName: settings.siteName,
    ...(twitterSite ? { twitterSite } : {}),
  }
}

function recordId(value: unknown): number | undefined {
  if (typeof value !== 'object' || value === null || !('id' in value)) return undefined
  return typeof value.id === 'number' ? value.id : undefined
}

function updatedAtValue(value: unknown): string | undefined {
  const updatedAt = stringValue(value)
  return updatedAt || undefined
}

export async function getSitemapContent(): Promise<SitemapContent> {
  'use cache'
  cacheLife('hours')
  cacheTag('locations', 'news', 'pages')
  const payload = await getPayload({ config })
  const localizedResults = await Promise.all(
    contentLocales.map(async (locale) => {
      const [pages, news, locations] = await Promise.all([
        payload.find({
          collection: 'pages',
          depth: 0,
          draft: false,
          fallbackLocale: false,
          limit: 100,
          locale,
          overrideAccess: false,
          select: { layout: true, lead: true, parent: true, slug: true, updatedAt: true },
          sort: 'createdAt',
        }),
        payload.find({
          collection: 'news',
          depth: 1,
          draft: false,
          fallbackLocale: false,
          limit: 100,
          locale,
          overrideAccess: false,
          select: { country: true, excerpt: true, slug: true, title: true, updatedAt: true },
          sort: 'createdAt',
        }),
        payload.find({
          collection: 'locations',
          depth: 0,
          draft: false,
          fallbackLocale: false,
          limit: 100,
          locale,
          overrideAccess: false,
          select: { description: true, slug: true, title: true, updatedAt: true },
          sort: 'createdAt',
        }),
      ])
      return { locale, locations, news, pages }
    }),
  )
  const source = localizedResults.find(({ locale }) => locale === 'en')
  if (!source) throw new Error('English sitemap source content is required')

  function availableLocales(
    id: number,
    collection: 'locations' | 'news' | 'pages',
  ): readonly ContentLocale[] {
    return localizedResults.flatMap((result) => {
      const document = result[collection].docs.find((candidate) => candidate.id === id)
      if (!document) return []
      const record = document as unknown as Record<string, unknown>
      const complete =
        collection === 'pages'
          ? Boolean(stringValue(record.lead)) &&
            Array.isArray(record.layout) &&
            record.layout.length > 0
          : collection === 'news'
            ? Boolean(stringValue(record.title) && stringValue(record.excerpt))
            : Boolean(stringValue(record.title) && stringValue(record.description))
      return complete ? [result.locale] : []
    })
  }

  const pageRecords = source.pages.docs.flatMap((page) => {
    const record = page as unknown as Record<string, unknown>
    const id = recordId(record)
    const slug = stringValue(record.slug)
    return id !== undefined && slug
      ? [
          {
            id,
            parentId: typeof record.parent === 'number' ? record.parent : undefined,
            locales: availableLocales(id, 'pages'),
            slug,
            updatedAt: updatedAtValue(record.updatedAt),
          },
        ]
      : []
  })
  const pagesById = new Map(pageRecords.map((page) => [page.id, page]))

  function pagePath(page: (typeof pageRecords)[number], depth = 0): string | undefined {
    if (depth >= 8) return undefined
    if (page.parentId === undefined) return `/${page.slug}`
    const parent = pagesById.get(page.parentId)
    const parentPath = parent ? pagePath(parent, depth + 1) : undefined
    return parentPath ? `${parentPath}/${page.slug}` : undefined
  }

  return {
    locations: source.locations.docs.flatMap((location) => {
      const record = location as unknown as Record<string, unknown>
      const id = recordId(record)
      const slug = stringValue(record.slug)
      return id !== undefined && slug
        ? [
            {
              locales: availableLocales(id, 'locations'),
              slug,
              updatedAt: updatedAtValue(record.updatedAt),
            },
          ]
        : []
    }),
    news: source.news.docs.flatMap((news) => {
      const record = news as unknown as Record<string, unknown>
      const id = recordId(record)
      const slug = stringValue(record.slug)
      const country = countryValue(record.country)
      return id !== undefined && slug
        ? [
            {
              ...(country ? { countryCode: country.code } : {}),
              locales: availableLocales(id, 'news'),
              slug,
              updatedAt: updatedAtValue(record.updatedAt),
            },
          ]
        : []
    }),
    pages: pageRecords.flatMap((page) => {
      const pagePathValue = pagePath(page)
      return pagePathValue
        ? [{ locales: page.locales, path: pagePathValue, updatedAt: page.updatedAt }]
        : []
    }),
  }
}

export async function getPublishedNews(
  locale: ContentLocale,
  countryCode?: string,
  limit = 12,
  includeCountryNews = false,
): Promise<readonly NewsSummary[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('news', ...(countryCode ? [`country:${countryCode}`] : []))
  const payload = await getPayload({ config })
  const [countryId, countryIds] = await Promise.all([
    countryCode ? countryIdForCode(countryCode, locale) : Promise.resolve(undefined),
    includeCountryNews && !countryCode ? countryIdsForLocale(locale) : Promise.resolve([]),
  ])
  if (countryCode && countryId === undefined) return []
  const result = await payload.find({
    collection: 'news',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    limit,
    overrideAccess: false,
    select: {
      category: true,
      country: true,
      excerpt: true,
      heroMedia: true,
      meta: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
    sort: '-publishedAt',
    where:
      countryId !== undefined
        ? {
            or: [
              { scope: { equals: 'global' } },
              { and: [{ scope: { equals: 'country' } }, { country: { equals: countryId } }] },
            ],
          }
        : includeCountryNews
          ? {
              or: [
                { scope: { equals: 'global' } },
                { and: [{ scope: { equals: 'country' } }, { country: { in: countryIds } }] },
              ],
            }
          : { scope: { equals: 'global' } },
  })

  return compact(result.docs.map((doc) => mapSummary(doc as unknown as Record<string, unknown>)))
}

export async function getNewsBySlug(
  slug: string,
  locale: ContentLocale,
  countryCode?: string,
): Promise<NewsArticle | undefined> {
  'use cache'
  cacheLife('hours')
  cacheTag('news', `news:${slug}`, ...(countryCode ? [`country:${countryCode}`] : []))
  const payload = await getPayload({ config })
  const countryId = countryCode ? await countryIdForCode(countryCode, locale) : undefined
  if (countryCode && countryId === undefined) return undefined
  const result = await payload.find({
    collection: 'news',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    limit: 1,
    overrideAccess: false,
    select: {
      body: true,
      category: true,
      country: true,
      excerpt: true,
      heroMedia: true,
      meta: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
    where: {
      and: [
        { slug: { equals: slug } },
        countryId === undefined
          ? { scope: { equals: 'global' } }
          : { and: [{ scope: { equals: 'country' } }, { country: { equals: countryId } }] },
      ],
    },
  })
  const doc = result.docs[0]
  if (!doc) return undefined
  const record = doc as unknown as Record<string, unknown>
  const summary = mapSummary(record)
  if (!summary) return undefined
  const body = record.body
  if (typeof body !== 'object' || body === null || !('root' in body)) return undefined
  return { ...summary, body: body as News['body'] }
}

export async function getPreviewNewsById(
  id: number,
  locale: ContentLocale,
): Promise<NewsArticle | undefined> {
  const payload = await getPayload({ config })
  const doc = await payload.findByID({
    collection: 'news',
    depth: 1,
    draft: true,
    fallbackLocale: false,
    id,
    locale,
    overrideAccess: true,
    select: {
      body: true,
      category: true,
      country: true,
      excerpt: true,
      heroMedia: true,
      meta: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
  })
  const record = doc as unknown as Record<string, unknown>
  const summary = mapSummary(record)
  if (!summary) return undefined
  const body = record.body
  if (typeof body !== 'object' || body === null || !('root' in body)) return undefined
  return { ...summary, body: body as News['body'] }
}

export async function getNewsPreviewPathById(
  id: number,
): Promise<{ readonly countryCode?: string; readonly slug: string } | undefined> {
  const payload = await getPayload({ config })
  const doc = await payload.findByID({
    collection: 'news',
    depth: 1,
    draft: true,
    id,
    overrideAccess: true,
    select: { country: true, slug: true },
  })
  const slug = stringValue(doc.slug)
  if (!slug) return undefined
  const country = countryValue(doc.country)
  return { ...(country ? { countryCode: country.code } : {}), slug }
}

export async function getPublishedLocations(
  locale: ContentLocale,
): Promise<readonly LocationSummary[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('locations', `locations:${locale}`)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'locations',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    limit: 24,
    overrideAccess: false,
    select: {
      description: true,
      heroMedia: true,
      meta: true,
      serviceTags: true,
      slug: true,
      title: true,
    },
    sort: 'title',
  })

  return compact(
    result.docs.map((doc) => mapLocationSummary(doc as unknown as Record<string, unknown>)),
  )
}

export async function getLocationBySlug(
  slug: string,
  locale: ContentLocale,
): Promise<LocationRecord | undefined> {
  'use cache'
  cacheLife('hours')
  cacheTag('locations', `location:${slug}`, `locations:${locale}`)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'locations',
    depth: 1,
    draft: false,
    fallbackLocale: false,
    locale,
    limit: 1,
    overrideAccess: false,
    select: {
      city: true,
      country: true,
      countryName: true,
      description: true,
      heroMedia: true,
      meta: true,
      serviceTags: true,
      slug: true,
      title: true,
    },
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  if (!doc) return undefined
  const record = doc as unknown as Record<string, unknown>
  const location = mapLocationSummary(record)
  if (!location) return undefined
  const city = stringValue(record.city)
  const countryName = stringValue(record.countryName)
  if (!city || !countryName) return undefined
  return { ...location, city, countryName }
}

async function findPageBySegment(
  slug: string,
  parent: number | undefined,
  draft: boolean,
  locale: ContentLocale,
): Promise<ManagedPageLookup | undefined> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    fallbackLocale: false,
    locale,
    limit: 1,
    overrideAccess: draft,
    select: { layout: true, lead: true, meta: true, slug: true, title: true },
    where:
      parent === undefined
        ? { and: [{ slug: { equals: slug } }, { parent: { exists: false } }] }
        : { and: [{ slug: { equals: slug } }, { parent: { equals: parent } }] },
  })
  return result.docs[0]
}

async function lookupPageByPath(
  segments: readonly string[],
  draft: boolean,
  locale: ContentLocale,
): Promise<ManagedPage | undefined> {
  async function lookupSegment(
    index: number,
    parent: number | undefined,
  ): Promise<ManagedPageLookup | undefined> {
    const segment = segments[index]
    if (!segment) return undefined
    const page = await findPageBySegment(segment, parent, draft, locale)
    if (!page) return undefined
    if (index === segments.length - 1) return page
    return lookupSegment(index + 1, page.id)
  }

  const page = await lookupSegment(0, undefined)
  return page ? mapManagedPage(page) : undefined
}

export async function getPageByPath(
  segments: readonly string[],
  locale: ContentLocale,
  draft = false,
): Promise<ManagedPage | undefined> {
  'use cache'
  cacheLife('hours')
  cacheTag('pages', `page:${segments.join('/')}`, `pages:${locale}`)
  if (segments.length === 0) return undefined
  return lookupPageByPath(segments, draft, locale)
}

async function getPageChildrenByParentSlug(
  parentSlug: string,
  locale: ContentLocale,
): Promise<readonly ManagedPageSummary[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('pages', `page-children:${parentSlug}`, `pages:${locale}`)
  const payload = await getPayload({ config })
  const parentResult = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    locale,
    limit: 1,
    overrideAccess: false,
    select: { slug: true },
    where: { and: [{ slug: { equals: parentSlug } }, { parent: { exists: false } }] },
  })
  const parent = parentResult.docs[0]
  if (!parent) return []

  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    locale,
    limit: 12,
    overrideAccess: false,
    select: { lead: true, slug: true, title: true },
    sort: 'title',
    where: { parent: { equals: parent.id } },
  })

  return compact(result.docs.map(mapManagedPageSummary))
}

export async function getPublishedPageChildren(
  parentSlug: string,
  locale: ContentLocale,
): Promise<readonly ManagedPageSummary[]> {
  return getPageChildrenByParentSlug(parentSlug, locale)
}

export async function getPagePathById(id: number): Promise<string | undefined> {
  const payload = await getPayload({ config })
  async function findSegments(
    currentId: number,
    depth: number,
  ): Promise<readonly string[] | undefined> {
    if (depth >= 8) return undefined
    const page = await payload.findByID({
      collection: 'pages',
      depth: 0,
      draft: true,
      id: currentId,
      overrideAccess: true,
      select: { parent: true, slug: true },
    })
    const parent = pageParentId(page)
    if (parent === undefined) return [page.slug]
    const parentSegments = await findSegments(parent, depth + 1)
    return parentSegments ? [...parentSegments, page.slug] : undefined
  }

  const segments = await findSegments(id, 0)
  return segments ? `/${segments.join('/')}` : undefined
}

export async function getPublicMediaFile(
  filename: string,
): Promise<{ readonly body: ArrayBuffer; readonly contentType: string } | undefined> {
  if (path.basename(filename) !== filename) return undefined
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'media',
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: { filename: true, mimeType: true },
    where: { filename: { equals: filename } },
  })
  const media = result.docs[0]
  const storedFilename = stringValue(media?.filename)
  const contentType = stringValue(media?.mimeType)
  if (!storedFilename || !contentType) return undefined

  const storedFile = await readFile(path.join(mediaDirectory, storedFilename))
  const body = new Uint8Array(storedFile.byteLength)
  body.set(storedFile)
  return { body: body.buffer, contentType }
}

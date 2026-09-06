import { RichText } from '@payloadcms/richtext-lexical/react'
import { publicEnvironment } from '@repo/contracts/env'
import { newsPreviewToken } from '@repo/payload-config/preview'
import { ArticleBody, ArticleHeroMedia, ArticleProvenance } from '@repo/ui/card'
import { ArrowRight, CalendarDays, Icon } from '@repo/ui/icon'
import {
  ArticleLayout,
  Cluster,
  Container,
  LocationDetailGrid,
  Section,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'
import { format, parseISO } from 'date-fns'
import { enUS, es, ja } from 'date-fns/locale'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { LivePreviewRefresh } from '@/components/LivePreviewRefresh'
import { ArticleDetailsSkeleton, ArticleHeroSkeleton } from '@/components/LoadingSkeletons'
import { getNewsBySlug, getPreviewNewsById, getSeoSettings, type NewsArticle } from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  readonly params: Promise<{ locale: string; slug: string }>
  readonly searchParams: Promise<{
    readonly country?: string
    readonly id?: string
    readonly preview?: string
  }>
}

type NewsLookup = { readonly article?: NewsArticle; readonly previewId?: number }

const dateLocales = { en: enUS, es, ja }

function previewNewsId(searchParams: {
  readonly id?: string
  readonly preview?: string
}): number | undefined {
  if (searchParams.preview !== newsPreviewToken || !searchParams.id) return undefined
  const id = Number(searchParams.id)
  return Number.isSafeInteger(id) && id > 0 ? id : undefined
}

async function lookupNewsArticle({ params, searchParams }: PageProps): Promise<NewsLookup> {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const locale = await getSiteLocale()
  const previewId = previewNewsId(query)
  const article = previewId
    ? await getPreviewNewsById(previewId, locale)
    : await getNewsBySlug(slug, locale, query.country)
  return article?.slug === slug ? { article, ...(previewId ? { previewId } : {}) } : {}
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ article, previewId }, { slug }, query, locale] = await Promise.all([
    lookupNewsArticle({ params, searchParams }),
    params,
    searchParams,
    getSiteLocale(),
  ])
  if (!article) return { title: 'Story not found' }
  const countryQuery = query.country ? `?country=${encodeURIComponent(query.country)}` : ''
  return buildPageMetadata({
    description: article.excerpt,
    pageImage: article.hero,
    locale,
    noIndex: previewId !== undefined,
    path: `/news/${slug}${countryQuery}`,
    seo: article.seo,
    settings: await getSeoSettings(locale),
    title: article.title,
  })
}

export default function NewsDetailPage({ params, searchParams }: PageProps) {
  return (
    <article>
      <Section space="compact">
        <Container>
          <Stack gap="xl">
            <Text color="brand" testId="story-shell" variant="label">
              The Dispatch / Story
            </Text>
            <Suspense fallback={<ArticleHeroSkeleton />}>
              <ArticleHero params={params} searchParams={searchParams} />
            </Suspense>
          </Stack>
        </Container>
      </Section>
      <Suspense fallback={<ArticleDetailsSkeleton />}>
        <ArticleDetails params={params} searchParams={searchParams} />
      </Suspense>
      <ArticleNextStep />
      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </article>
  )
}

async function ArticleHero({ params, searchParams }: PageProps) {
  const { article } = await lookupNewsArticle({ params, searchParams })
  if (!article) notFound()
  const locale = await getSiteLocale()
  const published = format(parseISO(article.publishedAt), 'PPPP', {
    locale: dateLocales[locale],
  })

  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Text as="h1" variant="h1">
          {article.title}
        </Text>
        <Text color="muted" variant="lead">
          {article.excerpt}
        </Text>
        <Cluster>
          <Icon source={CalendarDays} size="sm" tone="muted" />
          <Text color="muted" variant="small">
            {published}
          </Text>
        </Cluster>
      </Stack>
      <ArticleHeroMedia alt={article.hero.alt} src={article.hero.url} />
    </Stack>
  )
}

async function ArticleDetails({ params, searchParams }: PageProps) {
  const { article, previewId } = await lookupNewsArticle({ params, searchParams })
  if (!article) notFound()
  const preview = await draftMode()
  const previewActive = preview.isEnabled || previewId !== undefined

  return (
    <>
      {previewActive ? (
        <LivePreviewRefresh sourceOrigin={new URL(publicEnvironment.cmsUrl).origin} />
      ) : null}
      <Section space="compact">
        <Container>
          <ArticleLayout>
            <ArticleBody>
              <RichText data={article.body} />
            </ArticleBody>
            <ArticleProvenance>
              <Stack gap="md">
                <Text as="strong" variant="label">
                  Published story
                </Text>
                <Text color="muted" variant="small">
                  Illustrative newsroom content managed in the CMS. It does not report live
                  operations, customer outcomes, or service availability.
                </Text>
                <Link
                  href={article.country ? `/news?country=${article.country.code}` : '/news'}
                  variant="inline"
                >
                  All stories <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
            </ArticleProvenance>
          </ArticleLayout>
        </Container>
      </Section>
    </>
  )
}

function ArticleNextStep() {
  return (
    <Surface border="subtle" tone="soft">
      <Section space="compact">
        <Container>
          <LocationDetailGrid>
            <Stack gap="md">
              <Text color="brand" variant="label">
                Next step
              </Text>
              <Text as="h2" variant="h2">
                Move from context to the right public route.
              </Text>
            </Stack>
            <Stack gap="lg">
              <Text color="muted">
                The newsroom can frame a topic. The service and form routes then provide a clear
                place to continue the conversation.
              </Text>
              <Link href="/shipping" variant="inline">
                Explore shipping <Icon source={ArrowRight} size="sm" />
              </Link>
            </Stack>
          </LocationDetailGrid>
        </Container>
      </Section>
    </Surface>
  )
}

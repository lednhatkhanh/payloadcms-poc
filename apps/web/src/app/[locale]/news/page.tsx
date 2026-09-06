import { CardLinkAffordance, FeaturedStoryCard } from '@repo/ui/card'
import { ArrowRight, Icon } from '@repo/ui/icon'
import {
  Cluster,
  Container,
  FilterSet,
  FilterGroup,
  LocationToolbar,
  NewsGrid,
  Section,
  SectionIntro,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Accent, Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NewsCard } from '@/components/NewsCard'
import { SiteFooter } from '@/components/SiteFooter'
import { NewsListingSkeleton } from '@/components/LoadingSkeletons'
import {
  getCountryFilters,
  getPublishedNews,
  getSeoSettings,
  newsHref,
  type NewsSummary,
} from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  readonly searchParams: Promise<{ readonly category?: string; readonly country?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()
  return buildPageMetadata({
    description: 'Company, product, people, and ideas from The Dispatch.',
    locale,
    path: '/news',
    settings: await getSeoSettings(locale),
    title: 'News',
  })
}

type NewsCategory = 'company' | 'product' | 'people' | 'ideas'

const filters: readonly { readonly label: string; readonly value: 'all' | NewsCategory }[] = [
  { label: 'All stories', value: 'all' },
  { label: 'Company', value: 'company' },
  { label: 'Product', value: 'product' },
  { label: 'People', value: 'people' },
  { label: 'Ideas', value: 'ideas' },
]

function isNewsCategory(value: string | undefined): value is NewsCategory {
  return value === 'company' || value === 'product' || value === 'people' || value === 'ideas'
}

function hrefForFilters(category: 'all' | NewsCategory, country?: string): string {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (country) params.set('country', country)
  const query = params.toString()
  return query ? `/news?${query}` : '/news'
}

export default function NewsPage({ searchParams }: PageProps) {
  return (
    <>
      <Section>
        <Container>
          <Stack gap="lg">
            <Text color="brand" variant="dispatchMark">
              The Dispatch / Newsroom
            </Text>
            <Text as="h1" testId="news-shell" variant="h1">
              The clearer side of <Accent>shipping.</Accent>
            </Text>
            <Text color="muted" variant="lead">
              A small editorial layer for this private demo: published illustrative stories about
              public routes, managed content, and the conversations they support.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section space="compact">
        <Container>
          <Suspense fallback={<NewsListingSkeleton />}>
            <NewsListing searchParams={searchParams} />
          </Suspense>
        </Container>
      </Section>

      <Surface border="subtle" tone="soft">
        <Section space="compact">
          <Container>
            <SectionIntro>
              <Stack gap="md">
                <Text color="brand" variant="label">
                  The Dispatch
                </Text>
                <Text as="h2" variant="h2">
                  Read the story, then follow the right public route.
                </Text>
              </Stack>
              <Stack gap="lg">
                <Text color="muted">
                  The newsroom stays adjacent to the company experience: it can provide context and
                  long-form reading without turning editorial content into operational proof.
                </Text>
                <Link href="/" variant="inline">
                  Return to the homepage <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
            </SectionIntro>
          </Container>
        </Section>
      </Surface>

      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </>
  )
}

async function NewsListing({ searchParams }: PageProps) {
  const locale = await getSiteLocale()
  const [{ category, country: requestedCountry }, countries] = await Promise.all([
    searchParams,
    getCountryFilters(locale),
  ])
  const selectedCountry = countries.find((country) => country.code === requestedCountry)
  const news = await getPublishedNews(locale, selectedCountry?.code, 12, true)
  const selectedFilter = isNewsCategory(category) ? category : 'all'
  const filteredNews =
    selectedFilter === 'all' ? news : news.filter((article) => article.category === selectedFilter)
  const featuredStory = filteredNews.at(0)
  const remainingStories = featuredStory ? filteredNews.slice(1) : []

  return (
    <Stack gap="2xl">
      <LocationToolbar>
        <Stack gap="xs">
          <Text color="muted" variant="small">
            {selectedCountry
              ? `Showing global stories alongside ${selectedCountry.name} newsroom updates.`
              : 'Showing global stories alongside every available country newsroom.'}
          </Text>
          <Text color="muted" variant="meta">
            Only published illustrative stories appear here. The Dispatch is the newsroom, not the
            company identity or a record of real operations.
          </Text>
        </Stack>
        <FilterGroup>
          <FilterSet label="Country">
            <Link
              active={selectedCountry === undefined}
              aria-current={selectedCountry === undefined ? 'page' : undefined}
              href={hrefForFilters(selectedFilter)}
              variant="filter"
            >
              All countries
            </Link>
            {countries.map((country) => (
              <Link
                active={country.code === selectedCountry?.code}
                aria-current={country.code === selectedCountry?.code ? 'page' : undefined}
                href={hrefForFilters(selectedFilter, country.code)}
                key={country.code}
                variant="filter"
              >
                {country.name}
              </Link>
            ))}
          </FilterSet>
          <FilterSet label="Topic">
            {filters.map((filter) => (
              <Link
                active={filter.value === selectedFilter}
                aria-current={filter.value === selectedFilter ? 'page' : undefined}
                href={hrefForFilters(filter.value, selectedCountry?.code)}
                key={filter.value}
                variant="filter"
              >
                {filter.label}
              </Link>
            ))}
          </FilterSet>
        </FilterGroup>
      </LocationToolbar>

      {featuredStory ? (
        <FeaturedStory article={featuredStory} />
      ) : (
        <Surface border="subtle" padding="lg" radius="lg" tone="soft">
          <Text color="muted">No published illustrative stories match this category.</Text>
        </Surface>
      )}

      {remainingStories.length > 0 ? (
        <NewsGrid>
          {remainingStories.map((article) => (
            <NewsCard article={article} key={newsHref(article)} />
          ))}
        </NewsGrid>
      ) : null}
    </Stack>
  )
}

function FeaturedStory({ article }: { readonly article: NewsSummary }) {
  return (
    <FeaturedStoryCard
      alt={article.hero.alt}
      href={newsHref(article)}
      label={`Read ${article.title}`}
      src={article.hero.url}
    >
      <Stack gap="md">
        <Text color="brand" variant="kicker">
          {article.country ? `${article.country.name} / ${article.category}` : article.category} /
          Featured
        </Text>
        <Text as="h2" variant="h2">
          {article.title}
        </Text>
        <Text color="muted" variant="lead">
          {article.excerpt}
        </Text>
        <Cluster>
          <Text color="muted" variant="meta">
            Illustrative published story · CMS-managed
          </Text>
        </Cluster>
        <CardLinkAffordance>
          Read story <Icon source={ArrowRight} size="sm" />
        </CardLinkAffordance>
      </Stack>
    </FeaturedStoryCard>
  )
}

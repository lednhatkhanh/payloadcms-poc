import {
  CardLinkAffordance,
  HeroMedia,
  HeroPlaceholder,
  LocationCard,
  LocationCardBody,
  LocationCardContent,
  ServiceCard,
  StoryCard,
  StoryCardContent,
  StoryCardFooter,
  StoryCardMedia,
  StoryCardMeta,
  Tag,
} from '@repo/ui/card'
import type { ContentLocale } from '@repo/payload-config/locales'
import { ArrowRight, Icon } from '@repo/ui/icon'
import {
  Cluster,
  Container,
  DispatchHeader,
  EditorialGrid,
  EditorialRule,
  EnquiryHeading,
  EnquiryGrid,
  FeatureGrid,
  HeroContent,
  HomeHeroGrid,
  NewsGrid,
  Section,
  SectionHeading,
  SectionIntro,
  ServiceGrid,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { ButtonLink, Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { ContactForm } from '@/components/PublicForms'
import {
  CompanyPagesSkeleton,
  HomepageHeroSkeleton,
  HomepageLocationsSkeleton,
  HomepageNewsroomSkeleton,
} from '@/components/LoadingSkeletons'
import {
  getHomepage,
  getPublishedPageChildren,
  getPublishedLocations,
  getPublishedNews,
  getSeoSettings,
  type LocationService,
  type ManagedPageSummary,
  type NewsSummary,
} from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { localizedHref } from '@/lib/navigation'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()
  const [homepage, settings] = await Promise.all([getHomepage(locale), getSeoSettings(locale)])
  return buildPageMetadata({
    description: homepage.heroBody,
    pageImage: homepage.hero,
    locale,
    path: '/',
    seo: homepage.seo,
    settings,
    title: homepage.heroTitle,
  })
}

const services = [
  {
    description:
      'An overview of the two illustrative service paths and the information each enquiry needs.',
    href: '/shipping',
    label: 'Explore services',
    title: 'Shipping services',
  },
  {
    description: 'A focused detail page for visitors who want to frame an ocean-freight question.',
    href: '/shipping/ocean-freight',
    label: 'Read the ocean-freight page',
    title: 'Ocean freight',
  },
  {
    description:
      'A companion page connecting a logistics question with illustrative location records.',
    href: '/shipping/logistics-solutions',
    label: 'Read the logistics page',
    title: 'Logistics solutions',
  },
] as const

const locationServiceLabels: Record<LocationService, string> = {
  'logistics-solutions': 'Logistics solutions',
  'ocean-freight': 'Ocean freight',
}

export default function HomePage() {
  return (
    <>
      <Section id="about" space="hero">
        <Container>
          <Suspense fallback={<HomepageHeroSkeleton />}>
            <HomepageHero />
          </Suspense>
        </Container>
      </Section>

      <Container>
        <EditorialRule />
      </Container>

      <Section id="services">
        <Container>
          <Stack gap="2xl">
            <SectionHeading>
              <Text color="brand" variant="label">
                Shipping
              </Text>
              <Text as="h2" variant="section">
                A small set of useful paths.
              </Text>
              <Text color="muted" variant="lead">
                The homepage leads with essential options instead of turning the demonstration into
                a general page builder.
              </Text>
            </SectionHeading>
            <ServiceGrid>
              {services.map((service) => (
                <ServiceCard key={service.title}>
                  <Stack gap="md">
                    <Text as="h3" variant="h3">
                      {service.title}
                    </Text>
                    <Text color="muted">{service.description}</Text>
                  </Stack>
                  <Link href={service.href} variant="inline">
                    {service.label} <Icon source={ArrowRight} size="sm" />
                  </Link>
                </ServiceCard>
              ))}
            </ServiceGrid>
          </Stack>
        </Container>
      </Section>

      <Surface border="subtle" tone="surface">
        <Section id="company">
          <Container>
            <Stack gap="2xl">
              <SectionIntro>
                <SectionHeading>
                  <Text as="h2" variant="section">
                    Company pages, within the established system.
                  </Text>
                </SectionHeading>
                <Text color="muted" variant="small">
                  A concise CMS-managed page set that only uses the approved content blocks and
                  shared public-site components.
                </Text>
              </SectionIntro>
              <Suspense fallback={<CompanyPagesSkeleton />}>
                <HomepageCompanyPages />
              </Suspense>
              <Link href="/company" variant="inline">
                Read the Company introduction <Icon source={ArrowRight} size="sm" />
              </Link>
            </Stack>
          </Container>
        </Section>
      </Surface>

      <Surface border="subtle" tone="surface">
        <Section id="locations">
          <Container>
            <Stack gap="2xl">
              <SectionIntro>
                <SectionHeading>
                  <Text color="brand" variant="label">
                    Locations
                  </Text>
                  <Text as="h2" variant="section">
                    Managed location records, with useful detail.
                  </Text>
                </SectionHeading>
                <Text color="muted" variant="small">
                  Illustrative content for demonstrating CMS-managed location cards. These entries
                  do not represent offices, contacts, or operational coverage.
                </Text>
              </SectionIntro>
              <Suspense fallback={<HomepageLocationsSkeleton />}>
                <HomepageLocations />
              </Suspense>
            </Stack>
          </Container>
        </Section>
      </Surface>

      <Section id="dispatch">
        <Container>
          <Stack gap="2xl">
            <DispatchHeader>
              <SectionHeading>
                <Text color="brand" variant="label">
                  The Dispatch
                </Text>
                <Text as="h2" variant="section">
                  The editorial layer, kept distinct.
                </Text>
              </SectionHeading>
              <Text as="p" variant="dispatchMark">
                The Dispatch / Newsroom
              </Text>
            </DispatchHeader>
            <Suspense fallback={<HomepageNewsroomSkeleton />}>
              <NewsroomStories />
            </Suspense>
            <Link href="/news" variant="inline">
              Visit the newsroom <Icon source={ArrowRight} size="sm" />
            </Link>
          </Stack>
        </Container>
      </Section>

      <Section id="enquiry">
        <Container>
          <EnquiryGrid>
            <EnquiryHeading>
              <Text color="brand" variant="label">
                Next step
              </Text>
              <Text as="h2" variant="enquiry">
                Point each question to the right form.
              </Text>
              <Surface border="default" padding="md" radius="md" tone="soft">
                <Stack gap="lg">
                  <Stack gap="xs">
                    <Text color="brand" variant="label">
                      Three simple steps
                    </Text>
                    <Text color="muted" variant="small">
                      The form keeps an enquiry useful without making the demo feel like a tracking
                      portal.
                    </Text>
                  </Stack>
                  <Stack gap="md">
                    <Stack gap="2xs">
                      <Text variant="meta">01 / Choose a route</Text>
                      <Text variant="small">
                        Start with a general question, a quote request, or a shipment reference.
                      </Text>
                    </Stack>
                    <Stack gap="2xs">
                      <Text variant="meta">02 / Add the useful detail</Text>
                      <Text variant="small">
                        Quote requests collect the service, origin, and destination; shipment
                        questions capture a reference.
                      </Text>
                    </Stack>
                    <Stack gap="2xs">
                      <Text variant="meta">03 / Keep it with the right team</Text>
                      <Text variant="small">
                        The submission is visible only to the demo operations team and
                        administrators.
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Surface>
            </EnquiryHeading>
            <Stack gap="2xl">
              <Stack gap="md">
                <Text color="muted">
                  Choose a general contact, quote request, or shipment question. Each route records
                  the specific context the team needs, without pretending to offer real-time
                  tracking.
                </Text>
                <Text color="muted" variant="small">
                  Messages are available only to the demo operations team and administrators.
                </Text>
              </Stack>
              <Surface border="default" padding="lg" radius="lg" tone="surface">
                <ContactForm />
              </Surface>
            </Stack>
          </EnquiryGrid>
        </Container>
      </Section>

      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </>
  )
}

async function HomepageLocations() {
  const locale = await getSiteLocale()
  const locations = await getPublishedLocations(locale)
  if (locations.length === 0) {
    return <Text color="muted">No published illustrative locations yet.</Text>
  }

  return (
    <FeatureGrid>
      {locations.slice(0, 3).map((location) => (
        <LocationCard
          href={localizedHref(locale, `/locations/${location.slug}`)}
          key={location.slug}
        >
          <LocationCardBody>
            <div>
              <Text color="muted" variant="kicker">
                Illustrative location
              </Text>
              <LocationCardContent>
                <Text as="h3" variant="h3">
                  {location.title}
                </Text>
                <Text color="muted">{location.description}</Text>
              </LocationCardContent>
            </div>
            <Cluster>
              {location.serviceTags.map((serviceTag) => (
                <Tag key={serviceTag}>{locationServiceLabels[serviceTag]}</Tag>
              ))}
            </Cluster>
          </LocationCardBody>
        </LocationCard>
      ))}
    </FeatureGrid>
  )
}

async function HomepageCompanyPages() {
  const locale = await getSiteLocale()
  const pages = await getPublishedPageChildren('company', locale)
  if (pages.length === 0) {
    return <Text color="muted">The Company pages are being prepared.</Text>
  }

  return (
    <NewsGrid>
      {pages.map((page) => (
        <HomepageCompanyPageCard key={page.slug} locale={locale} page={page} />
      ))}
    </NewsGrid>
  )
}

function HomepageCompanyPageCard({
  locale,
  page,
}: {
  readonly locale: ContentLocale
  readonly page: ManagedPageSummary
}) {
  return (
    <StoryCard
      href={localizedHref(locale, `/company/${page.slug}`)}
      label={`Read ${page.title}`}
      size="compact"
    >
      <StoryCardContent>
        <Stack gap="sm">
          <Text as="h3" variant="h3">
            {page.title}
          </Text>
          <Text color="muted">{page.lead}</Text>
        </Stack>
      </StoryCardContent>
      <StoryCardFooter>
        <CardLinkAffordance>
          Read page <Icon source={ArrowRight} size="sm" />
        </CardLinkAffordance>
      </StoryCardFooter>
    </StoryCard>
  )
}

async function NewsroomStories() {
  const locale = await getSiteLocale()
  const news = await getPublishedNews(locale, undefined, 3)

  if (news.length === 0) {
    return (
      <Surface border="subtle" padding="lg" radius="lg" tone="soft">
        <Text color="muted">The first stories are being prepared.</Text>
      </Surface>
    )
  }

  return (
    <EditorialGrid>
      {news.map((article, index) => (
        <HomepageStoryCard
          article={article}
          featured={index === 0}
          key={article.slug}
          label={index === 0 ? 'Featured example' : index === 1 ? 'Behind the demo' : 'Guide'}
          locale={locale}
          meta={
            index === 0
              ? 'Published story example · CMS-managed'
              : index === 1
                ? 'News detail example'
                : 'News listing example'
          }
        />
      ))}
    </EditorialGrid>
  )
}

function HomepageStoryCard({
  article,
  featured,
  label,
  locale,
  meta,
}: {
  readonly article: NewsSummary
  readonly featured: boolean
  readonly label: string
  readonly locale: ContentLocale
  readonly meta: string
}) {
  const story = (
    <Stack gap="sm">
      <Text as="h3" variant="h3">
        {article.title}
      </Text>
      <Text color="muted">{article.excerpt}</Text>
    </Stack>
  )

  return (
    <StoryCard
      featured={featured}
      href={localizedHref(locale, `/news/${article.slug}`)}
      label={`Read ${article.title}`}
    >
      {featured ? (
        <div>
          <Text color="muted" variant="kicker">
            {label}
          </Text>
          <StoryCardContent>{story}</StoryCardContent>
        </div>
      ) : (
        <StoryCardMedia alt={article.hero.alt} src={article.hero.url} />
      )}
      {featured ? <StoryCardMedia alt={article.hero.alt} preload src={article.hero.url} /> : null}
      {!featured ? (
        <>
          <Text color="muted" variant="kicker">
            {label}
          </Text>
          <StoryCardContent>{story}</StoryCardContent>
        </>
      ) : null}
      <StoryCardFooter>
        <StoryCardMeta>{meta}</StoryCardMeta>
      </StoryCardFooter>
    </StoryCard>
  )
}

async function HomepageHero() {
  const locale = await getSiteLocale()
  const homepage = await getHomepage(locale)
  return (
    <HomeHeroGrid>
      <HeroContent>
        <Text color="brand" variant="label">
          {homepage.eyebrow}
        </Text>
        <Text as="h1" variant="hero">
          {homepage.heroTitle}
        </Text>
        <Text color="muted" variant="lead">
          {homepage.heroBody}
        </Text>
        <Cluster>
          <ButtonLink
            href={localizedHref(locale, homepage.primaryCta.href)}
            size="lg"
            variant="primary"
          >
            {homepage.primaryCta.label} <Icon source={ArrowRight} size="sm" />
          </ButtonLink>
          <ButtonLink
            href={localizedHref(locale, homepage.secondaryCta.href)}
            size="lg"
            variant="secondary"
          >
            {homepage.secondaryCta.label}
          </ButtonLink>
        </Cluster>
      </HeroContent>
      {homepage.hero ? (
        <HeroMedia
          alt={homepage.hero.alt}
          caption="Illustrative harbor scene · For demonstrative use"
          src={homepage.hero.url}
        />
      ) : (
        <HeroPlaceholder />
      )}
    </HomeHeroGrid>
  )
}

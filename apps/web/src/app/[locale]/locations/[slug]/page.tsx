import { LocationDetailMedia, LocationFactPanel, Tag } from '@repo/ui/card'
import { ArrowRight, Icon } from '@repo/ui/icon'
import { Cluster, Container, LocationDetailGrid, Section, Stack, Surface } from '@repo/ui/layout'
import { ButtonLink, Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { LocationDetailSkeleton } from '@/components/LoadingSkeletons'
import { getLocationBySlug, getSeoSettings, type LocationService } from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  readonly params: Promise<{ readonly locale: string; readonly slug: string }>
}

const locationServiceLabels: Record<LocationService, string> = {
  'logistics-solutions': 'Logistics solutions',
  'ocean-freight': 'Ocean freight',
}

const locationServicePaths: Record<
  LocationService,
  { readonly href: string; readonly label: string }
> = {
  'logistics-solutions': {
    href: '/locations?service=logistics-solutions',
    label: 'Browse logistics locations',
  },
  'ocean-freight': { href: '/shipping/ocean-freight', label: 'Explore ocean freight' },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getSiteLocale()
  const location = await getLocationBySlug(slug, locale)
  return location
    ? buildPageMetadata({
        description: location.description,
        pageImage: location.hero,
        locale,
        path: `/locations/${slug}`,
        seo: location.seo,
        settings: await getSeoSettings(locale),
        title: location.title,
      })
    : { title: 'Location not found' }
}

export default function LocationDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LocationDetailSkeleton />}>
      <LocationDetail params={params} />
    </Suspense>
  )
}

async function LocationDetail({ params }: PageProps) {
  const { slug } = await params
  const location = await getLocationBySlug(slug, await getSiteLocale())
  if (!location) notFound()
  const primaryService = location.serviceTags[0]
  if (!primaryService) notFound()
  const servicePath = locationServicePaths[primaryService]

  return (
    <>
      <Section space="compact">
        <Container>
          <Stack gap="lg">
            <Cluster>
              <Link href="/locations" variant="inline">
                Locations
              </Link>
              <Text color="muted" variant="meta">
                / {location.title}
              </Text>
            </Cluster>
            <Text color="brand" variant="label">
              Illustrative location
            </Text>
            <Text as="h1" variant="h1">
              {location.title}
            </Text>
            {location.hero ? (
              <LocationDetailMedia alt={location.hero.alt} src={location.hero.url} />
            ) : null}
          </Stack>
        </Container>
      </Section>

      <Section space="compact">
        <Container>
          <LocationDetailGrid>
            <Stack gap="xl">
              <Text color="muted" variant="lead">
                {location.description}
              </Text>
              <Cluster>
                {location.serviceTags.map((serviceTag) => (
                  <Tag key={serviceTag}>{locationServiceLabels[serviceTag]}</Tag>
                ))}
              </Cluster>
              <Link href={servicePath.href} variant="inline">
                {servicePath.label} <Icon source={ArrowRight} size="sm" />
              </Link>
            </Stack>
            <LocationFactPanel
              facts={[
                { label: 'Record state', value: 'Published illustrative content' },
                { label: 'City', value: location.city },
                { label: 'Country', value: location.countryName },
                { label: 'Contact details', value: 'Not provided in this demo' },
              ]}
            />
          </LocationDetailGrid>
        </Container>
      </Section>

      <Surface border="subtle" tone="soft">
        <Section space="compact">
          <Container>
            <LocationDetailGrid>
              <Stack gap="md">
                <Text color="brand" variant="label">
                  Next step
                </Text>
                <Text as="h2" variant="h2">
                  Ask a question without implying coverage.
                </Text>
              </Stack>
              <Stack gap="lg">
                <Text color="muted">
                  Location content helps a visitor find a relevant route. It does not substitute for
                  a confirmed quote, service availability, or real-time shipment status.
                </Text>
                <ButtonLink href="/#enquiry" variant="secondary">
                  Start an enquiry <Icon source={ArrowRight} size="sm" />
                </ButtonLink>
              </Stack>
            </LocationDetailGrid>
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

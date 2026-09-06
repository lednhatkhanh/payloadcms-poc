import {
  CardLinkAffordance,
  LocationCard,
  LocationCardBody,
  LocationCardContent,
  LocationCardMedia,
  Tag,
} from '@repo/ui/card'
import { ArrowRight, Icon } from '@repo/ui/icon'
import {
  Cluster,
  Container,
  FilterGroup,
  LocationGrid,
  LocationToolbar,
  Section,
  SectionIntro,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Accent, Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { LocationListingSkeleton } from '@/components/LoadingSkeletons'
import {
  getPublishedLocations,
  getSeoSettings,
  type LocationService,
  type LocationSummary,
} from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  readonly searchParams: Promise<{ readonly service?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()
  return buildPageMetadata({
    description: 'Published illustrative location records for the shipping and logistics demo.',
    locale,
    path: '/locations',
    settings: await getSeoSettings(locale),
    title: 'Locations',
  })
}

const locationServiceLabels: Record<LocationService, string> = {
  'logistics-solutions': 'Logistics solutions',
  'ocean-freight': 'Ocean freight',
}

const filters: readonly { readonly label: string; readonly value: 'all' | LocationService }[] = [
  { label: 'All records', value: 'all' },
  { label: 'Ocean freight', value: 'ocean-freight' },
  { label: 'Logistics', value: 'logistics-solutions' },
]

function isLocationService(value: string | undefined): value is LocationService {
  return value === 'ocean-freight' || value === 'logistics-solutions'
}

function hrefForFilter(filter: 'all' | LocationService): string {
  return filter === 'all' ? '/locations' : `/locations?service=${filter}`
}

export default function LocationsPage({ searchParams }: PageProps) {
  return (
    <>
      <Section>
        <Container>
          <Stack gap="lg">
            <Text color="brand" variant="label">
              Locations
            </Text>
            <Text as="h1" variant="h1">
              Location records, presented with <Accent>care.</Accent>
            </Text>
            <Text color="muted" variant="lead">
              This public listing demonstrates published, CMS-managed locations with service tags,
              CMS-owned lead imagery, and clear limits on what illustrative records can claim.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section space="compact">
        <Container>
          <Suspense fallback={<LocationListingSkeleton />}>
            <LocationListing searchParams={searchParams} />
          </Suspense>
        </Container>
      </Section>

      <Surface border="subtle" tone="soft">
        <Section space="compact">
          <Container>
            <SectionIntro>
              <Stack gap="md">
                <Text color="brand" variant="label">
                  The detail route
                </Text>
                <Text as="h2" variant="h2">
                  A record should guide the next useful action.
                </Text>
              </Stack>
              <Stack gap="lg">
                <Text color="muted">
                  Each detail page carries an editorial description, selected service tags, an
                  CMS-owned lead image, and an explicit path into the appropriate enquiry. Invalid
                  slugs receive a clear not-found state.
                </Text>
                <Link href="/locations/port-city-record" variant="inline">
                  Open a detail example <Icon source={ArrowRight} size="sm" />
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

async function LocationListing({ searchParams }: PageProps) {
  const locations = await getPublishedLocations(await getSiteLocale())
  const { service } = await searchParams
  const selectedFilter = isLocationService(service) ? service : 'all'
  const filteredLocations =
    selectedFilter === 'all'
      ? locations
      : locations.filter((location) => location.serviceTags.includes(selectedFilter))

  return (
    <Stack gap="2xl">
      <LocationToolbar>
        <Text color="muted" variant="small">
          Only published illustrative records are shown. These cards do not represent offices,
          contacts, or operational coverage.
        </Text>
        <FilterGroup>
          {filters.map((filter) => (
            <Link
              active={filter.value === selectedFilter}
              aria-current={filter.value === selectedFilter ? 'page' : undefined}
              href={hrefForFilter(filter.value)}
              key={filter.value}
              variant="filter"
            >
              {filter.label}
            </Link>
          ))}
        </FilterGroup>
      </LocationToolbar>

      {filteredLocations.length > 0 ? (
        <LocationGrid>
          {filteredLocations.map((location) => (
            <LocationRecordCard location={location} key={location.slug} />
          ))}
        </LocationGrid>
      ) : (
        <Surface border="subtle" padding="lg" radius="lg" tone="soft">
          <Text color="muted">No published illustrative records match this filter.</Text>
        </Surface>
      )}
    </Stack>
  )
}

function LocationRecordCard({ location }: { readonly location: LocationSummary }) {
  return (
    <LocationCard href={`/locations/${location.slug}`}>
      <LocationCardMedia alt={location.hero?.alt ?? ''} src={location.hero?.url} />
      <LocationCardBody>
        <div>
          <Text color="muted" variant="kicker">
            Published illustrative record
          </Text>
          <LocationCardContent>
            <Text as="h2" variant="h3">
              {location.title}
            </Text>
            <Text color="muted">{location.description}</Text>
          </LocationCardContent>
        </div>
        <Stack gap="lg">
          <Cluster>
            {location.serviceTags.map((serviceTag) => (
              <Tag key={serviceTag}>{locationServiceLabels[serviceTag]}</Tag>
            ))}
          </Cluster>
          <CardLinkAffordance>
            View detail <Icon source={ArrowRight} size="sm" />
          </CardLinkAffordance>
        </Stack>
      </LocationCardBody>
    </LocationCard>
  )
}

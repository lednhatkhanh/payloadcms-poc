import { LocationCardBody } from '@repo/ui/card'
import {
  ArticleLayout,
  Cluster,
  Container,
  EditorialGrid,
  FeatureGrid,
  FilterGroup,
  HomeHeroGrid,
  HeroContent,
  LocationDetailGrid,
  LocationGrid,
  LocationToolbar,
  NewsGrid,
  Section,
  Split,
  Stack,
} from '@repo/ui/layout'
import { Skeleton, SkeletonCard, SkeletonFeaturedCard, SkeletonStatus } from '@repo/ui/skeleton'
import { Text } from '@repo/ui/text'

function CopySkeleton({ title = 'title' }: { readonly title?: 'display' | 'title' }) {
  return (
    <Stack gap="sm">
      <Skeleton size="label" width="short" />
      <Skeleton size={title} />
      <Skeleton size={title} width="medium" />
      <Skeleton width="full" />
      <Skeleton width="long" />
    </Stack>
  )
}

function ControlSkeletons({ count = 3 }: { readonly count?: number }) {
  return (
    <FilterGroup>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} radius="md" size="control" width="control" />
      ))}
    </FilterGroup>
  )
}

function StoryCardSkeleton({
  featured = false,
  media = true,
  size = 'story',
}: {
  readonly featured?: boolean
  readonly media?: boolean
  readonly size?: 'compact' | 'story'
}) {
  return (
    <SkeletonCard size={featured ? 'featured' : size}>
      <Stack gap="lg">
        {media ? <Skeleton radius="md" size="storyMedia" /> : null}
        <CopySkeleton />
      </Stack>
      <Skeleton size="label" width="medium" />
    </SkeletonCard>
  )
}

function LocationCardSkeleton({ media = true }: { readonly media?: boolean }) {
  return (
    <SkeletonCard size="location">
      {media ? <Skeleton radius="none" size="locationMedia" /> : null}
      <LocationCardBody>
        <CopySkeleton />
        <Stack gap="lg">
          <ControlSkeletons count={2} />
          <Skeleton size="label" width="medium" />
        </Stack>
      </LocationCardBody>
    </SkeletonCard>
  )
}

function ToolbarSkeleton({ controls = 3 }: { readonly controls?: number }) {
  return (
    <LocationToolbar>
      <Stack gap="xs">
        <Skeleton width="full" />
        <Skeleton size="label" width="long" />
      </Stack>
      <ControlSkeletons count={controls} />
    </LocationToolbar>
  )
}

export function HomepageHeroSkeleton() {
  return (
    <SkeletonStatus label="Loading homepage introduction">
      <HomeHeroGrid>
        <HeroContent>
          <Skeleton size="label" width="short" />
          <Text as="div" variant="hero">
            <Stack gap="sm">
              <Skeleton size="display" />
              <Skeleton size="display" width="medium" />
            </Stack>
          </Text>
          <Stack gap="sm">
            <Skeleton size="lead" />
            <Skeleton size="lead" width="long" />
          </Stack>
          <Cluster>
            <Skeleton radius="md" size="control" width="controlWide" />
            <Skeleton radius="md" size="control" width="controlWide" />
          </Cluster>
        </HeroContent>
        <Skeleton radius="lg" size="heroMedia" />
      </HomeHeroGrid>
    </SkeletonStatus>
  )
}

export function CompanyPagesSkeleton() {
  return (
    <SkeletonStatus label="Loading company pages">
      <NewsGrid>
        {Array.from({ length: 2 }, (_, index) => (
          <StoryCardSkeleton key={index} media={false} size="compact" />
        ))}
      </NewsGrid>
    </SkeletonStatus>
  )
}

export function HomepageLocationsSkeleton() {
  return (
    <SkeletonStatus label="Loading locations">
      <FeatureGrid>
        {Array.from({ length: 3 }, (_, index) => (
          <LocationCardSkeleton key={index} media={false} />
        ))}
      </FeatureGrid>
    </SkeletonStatus>
  )
}

export function HomepageNewsroomSkeleton() {
  return (
    <SkeletonStatus label="Loading the latest stories">
      <EditorialGrid>
        {Array.from({ length: 3 }, (_, index) => (
          <StoryCardSkeleton featured={index === 0} key={index} media={index !== 0} />
        ))}
      </EditorialGrid>
    </SkeletonStatus>
  )
}

export function NewsListingSkeleton() {
  return (
    <SkeletonStatus label="Loading published stories">
      <Stack gap="2xl">
        <ToolbarSkeleton controls={6} />
        <SkeletonFeaturedCard>
          <CopySkeleton />
        </SkeletonFeaturedCard>
        <NewsGrid>
          {Array.from({ length: 4 }, (_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        </NewsGrid>
      </Stack>
    </SkeletonStatus>
  )
}

export function LocationListingSkeleton() {
  return (
    <SkeletonStatus label="Loading published locations">
      <Stack gap="2xl">
        <ToolbarSkeleton />
        <LocationGrid>
          {Array.from({ length: 6 }, (_, index) => (
            <LocationCardSkeleton key={index} />
          ))}
        </LocationGrid>
      </Stack>
    </SkeletonStatus>
  )
}

export function ArticleHeroSkeleton() {
  return (
    <SkeletonStatus label="Loading story introduction">
      <Stack gap="xl">
        <CopySkeleton title="display" />
        <Skeleton radius="lg" size="locationDetailMedia" />
      </Stack>
    </SkeletonStatus>
  )
}

export function ArticleDetailsSkeleton() {
  return (
    <SkeletonStatus label="Loading story body">
      <Section space="compact">
        <Container>
          <ArticleLayout>
            <Stack gap="lg">
              <Skeleton size="lead" />
              <Skeleton size="lead" />
              <Skeleton size="lead" width="long" />
              <Skeleton size="title" width="medium" />
              <Skeleton size="lead" />
              <Skeleton size="lead" width="long" />
            </Stack>
            <SkeletonCard size="compact">
              <CopySkeleton />
            </SkeletonCard>
          </ArticleLayout>
        </Container>
      </Section>
    </SkeletonStatus>
  )
}

export function LocationDetailSkeleton() {
  return (
    <SkeletonStatus label="Loading location details">
      <Section space="compact">
        <Container>
          <Stack gap="lg">
            <Skeleton size="label" width="short" />
            <Skeleton size="title" width="long" />
            <Skeleton radius="lg" size="locationDetailMedia" />
          </Stack>
        </Container>
      </Section>
      <Section space="compact">
        <Container>
          <LocationDetailGrid>
            <CopySkeleton />
            <SkeletonCard size="compact">
              <CopySkeleton />
            </SkeletonCard>
          </LocationDetailGrid>
        </Container>
      </Section>
    </SkeletonStatus>
  )
}

export function ManagedPageSkeleton() {
  return (
    <SkeletonStatus label="Loading page content">
      <Section>
        <Container size="content">
          <CopySkeleton title="display" />
        </Container>
      </Section>
      <Section space="compact">
        <Container>
          <Split>
            <CopySkeleton />
            <Skeleton radius="lg" size="locationDetailMedia" />
          </Split>
        </Container>
      </Section>
    </SkeletonStatus>
  )
}

export function LanguageSelectorSkeleton() {
  return (
    <SkeletonStatus label="Loading language selector">
      <Skeleton radius="md" size="control" width="control" />
    </SkeletonStatus>
  )
}

import { publicEnvironment } from '@repo/contracts/env'
import { pagePreviewToken } from '@repo/payload-config/preview'
import { Container, Section, Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { LivePreviewRefresh } from '@/components/LivePreviewRefresh'
import { ManagedPageSkeleton } from '@/components/LoadingSkeletons'
import { PageBlocks } from '@/components/PageBlocks'
import { SiteFooter } from '@/components/SiteFooter'
import { getPageByPath, getSeoSettings } from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/lib/seo'

type PreviewSearchParams = { readonly id?: string; readonly preview?: string }
type PageProps = {
  readonly params: Promise<{ locale: string; segments: string[] }>
  readonly searchParams: Promise<PreviewSearchParams>
}

function previewPageId(searchParams: PreviewSearchParams): number | undefined {
  if (searchParams.preview !== pagePreviewToken || !searchParams.id) return undefined
  const id = Number(searchParams.id)
  return Number.isSafeInteger(id) && id > 0 ? id : undefined
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { segments } = await params
  const previewPage = previewPageId(await searchParams)
  const locale = await getSiteLocale()
  const page = await getPageByPath(segments, locale, previewPage !== undefined)
  return page && (previewPage === undefined || page.id === previewPage)
    ? buildPageMetadata({
        description: page.lead,
        locale,
        noIndex: previewPage !== undefined,
        path: `/${segments.join('/')}`,
        seo: page.seo,
        settings: await getSeoSettings(locale),
        title: page.title,
      })
    : { title: 'Page not found' }
}

export default function ManagedPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<ManagedPageSkeleton />}>
      <ManagedPageContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}

async function ManagedPageContent({ params, searchParams }: PageProps) {
  const { segments } = await params
  const previewPage = previewPageId(await searchParams)
  const preview = await draftMode()
  const previewActive = preview.isEnabled || previewPage !== undefined
  const page = await getPageByPath(segments, await getSiteLocale(), previewActive)
  if (!page || (previewPage !== undefined && page.id !== previewPage)) notFound()

  return (
    <article>
      {previewActive ? (
        <LivePreviewRefresh sourceOrigin={new URL(publicEnvironment.cmsUrl).origin} />
      ) : null}
      <Section>
        <Container size="content">
          <Stack gap="lg">
            <Text as="h1" variant="h1">
              {page.title}
            </Text>
            <Text color="muted" variant="lead">
              {page.lead}
            </Text>
          </Stack>
        </Container>
      </Section>
      <PageBlocks blocks={page.layout} />
      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </article>
  )
}

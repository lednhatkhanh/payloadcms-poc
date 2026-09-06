import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media, Page } from '@repo/payload-config/types'
import {
  ArticleBody,
  ArticleHeroMedia,
  CardLinkAffordance,
  StoryCard,
  StoryCardContent,
  StoryCardFooter,
} from '@repo/ui/card'
import { ArrowRight, Icon } from '@repo/ui/icon'
import { Container, NewsGrid, Section, Split, Stack, Surface } from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'

function pageHref(page: Page): string {
  const parent = page.parent
  if (typeof parent === 'object' && parent !== null) return `/${parent.slug}/${page.slug}`
  return `/${page.slug}`
}

function isPage(value: number | Page): value is Page {
  return typeof value === 'object'
}

function isMedia(value: number | Media): value is Media {
  return typeof value === 'object'
}

function mediaHref(media: Media): string | undefined {
  if (media.filename) return `/api/media/${encodeURIComponent(media.filename)}`
  return media.url ?? undefined
}

export function PageBlocks({ blocks }: { readonly blocks: Page['layout'] | undefined }) {
  if (!Array.isArray(blocks)) return null

  return blocks.map((block) => {
    if (block.blockType === 'richText') {
      return (
        <Section key={block.id ?? block.blockType} space="compact">
          <Container size="content">
            <ArticleBody>
              <RichText data={block.content} />
            </ArticleBody>
          </Container>
        </Section>
      )
    }

    if (block.blockType === 'callout') {
      return (
        <Surface border="subtle" key={block.id ?? block.blockType} tone="soft">
          <Section space="compact">
            <Container size="content">
              <Stack gap="md">
                <Text as="h2" variant="h2">
                  {block.title}
                </Text>
                <Text color="muted">{block.body}</Text>
                <Link aria-label={block.link.label} href={block.link.href} variant="inline">
                  {block.link.label} <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
            </Container>
          </Section>
        </Surface>
      )
    }

    if (block.blockType === 'image') {
      if (!isMedia(block.media)) return null
      const src = mediaHref(block.media)
      if (!src) return null

      return (
        <Section key={block.id ?? block.blockType} space="compact">
          <Container size="content">
            <Stack gap="sm">
              <ArticleHeroMedia alt={block.media.alt} src={src} />
              {block.caption ? (
                <Text color="muted" variant="meta">
                  {block.caption}
                </Text>
              ) : null}
            </Stack>
          </Container>
        </Section>
      )
    }

    if (block.blockType === 'feature') {
      if (!isMedia(block.media)) return null
      const src = mediaHref(block.media)
      if (!src) return null

      return (
        <Section key={block.id ?? block.blockType} space="compact">
          <Container>
            <Split>
              <Stack gap="md">
                <Text as="h2" variant="h2">
                  {block.title}
                </Text>
                <Text color="muted">{block.body}</Text>
                <Link aria-label={block.link.label} href={block.link.href} variant="inline">
                  {block.link.label} <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
              <ArticleHeroMedia alt={block.media.alt} src={src} />
            </Split>
          </Container>
        </Section>
      )
    }

    const pages = block.pages.filter(isPage)
    if (pages.length === 0) return null

    return (
      <Section key={block.id ?? block.blockType} space="compact">
        <Container>
          <Stack gap="xl">
            <Stack gap="sm">
              <Text as="h2" variant="h2">
                {block.title}
              </Text>
              <Text color="muted">{block.body}</Text>
            </Stack>
            <NewsGrid>
              {pages.map((page) => (
                <StoryCard
                  href={pageHref(page)}
                  key={page.id}
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
              ))}
            </NewsGrid>
          </Stack>
        </Container>
      </Section>
    )
  })
}

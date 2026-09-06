import {
  CardLinkAffordance,
  StoryCard,
  StoryCardContent,
  StoryCardFooter,
  StoryCardMedia,
  StoryCardMeta,
} from '@repo/ui/card'
import { Icon, ArrowRight, CalendarDays } from '@repo/ui/icon'
import { Cluster, Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import { format, parseISO } from 'date-fns'

import { newsHref, type NewsSummary } from '@/lib/content'

export function NewsCard({ article }: { readonly article: NewsSummary }) {
  const published = article.publishedAt ? format(parseISO(article.publishedAt), 'PP') : 'Recently'
  return (
    <StoryCard href={newsHref(article)} label={`Read ${article.title}`}>
      <StoryCardMedia alt={article.hero.alt} src={article.hero.url} />
      <Text color="brand" variant="kicker">
        {article.category}
      </Text>
      <StoryCardContent>
        <Stack gap="sm">
          <Text as="h2" variant="h3">
            {article.title}
          </Text>
          <Text color="muted">{article.excerpt}</Text>
        </Stack>
      </StoryCardContent>
      <StoryCardFooter>
        <StoryCardMeta>
          <Cluster>
            <Icon source={CalendarDays} size="sm" tone="muted" />
            <Text as="span" color="muted" variant="meta">
              {published}
            </Text>
          </Cluster>
        </StoryCardMeta>
        <CardLinkAffordance>
          Read story <Icon source={ArrowRight} size="sm" />
        </CardLinkAffordance>
      </StoryCardFooter>
    </StoryCard>
  )
}

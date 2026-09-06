import { ButtonLink } from '@repo/ui/link'
import { Container, Section, Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'

export default function NotFound() {
  return (
    <Section space="hero">
      <Container size="content">
        <Stack gap="lg">
          <Text color="brand" variant="label">
            404
          </Text>
          <Text as="h1" variant="h1">
            That story is not in the edition.
          </Text>
          <Text color="muted" variant="lead">
            It may be unpublished, renamed, or still being written.
          </Text>
          <ButtonLink href="/news" variant="primary">
            Return to news
          </ButtonLink>
        </Stack>
      </Container>
    </Section>
  )
}

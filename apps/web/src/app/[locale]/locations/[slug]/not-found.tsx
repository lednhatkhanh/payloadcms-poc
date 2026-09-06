import { ButtonLink } from '@repo/ui/link'
import { Container, Section, Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'

export default function LocationNotFound() {
  return (
    <Section space="hero">
      <Container size="content">
        <Stack gap="lg">
          <Text color="brand" variant="label">
            Location not found
          </Text>
          <Text as="h1" variant="h1">
            This illustrative record is not available.
          </Text>
          <Text color="muted" variant="lead">
            The public route only renders published location records. Try the published list or
            return to the homepage.
          </Text>
          <ButtonLink href="/locations" variant="primary">
            View published locations
          </ButtonLink>
        </Stack>
      </Container>
    </Section>
  )
}

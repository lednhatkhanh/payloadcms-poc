import {
  Container,
  FooterContent,
  FooterMeta,
  NewsletterFormLayout,
  NewsletterGrid,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { Text } from '@repo/ui/text'

import { NewsletterForm } from './PublicForms'

export function SiteFooter({ body, title }: { readonly body: string; readonly title: string }) {
  return (
    <Surface as="footer" tone="ink">
      <Container>
        <FooterContent>
          <Stack gap="2xl">
            <NewsletterGrid>
              <Stack gap="md">
                <Text color="inverse" variant="label">
                  The Dispatch
                </Text>
                <Text as="h2" color="inverse" variant="h2">
                  {title}
                </Text>
                <Text color="inverseMuted" variant="lead">
                  {body}
                </Text>
              </Stack>
              <NewsletterFormLayout>
                <NewsletterForm />
              </NewsletterFormLayout>
            </NewsletterGrid>
            <FooterMeta>
              <Text color="inverseMuted" variant="meta">
                Shipping &amp; logistics demo
              </Text>
              <Text color="inverseMuted" variant="meta">
                Illustrative public experience
              </Text>
            </FooterMeta>
          </Stack>
        </FooterContent>
      </Container>
    </Surface>
  )
}

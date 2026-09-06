import { Button } from '@repo/ui/button'
import { Cluster, Container, Surface } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

async function exitPreview() {
  'use server'

  const preview = await draftMode()
  preview.disable()
  redirect('/')
}

export async function PreviewBanner() {
  const preview = await draftMode()
  if (!preview.isEnabled) return null

  return (
    <Surface border="brand" tone="soft">
      <Container>
        <Cluster justify="between" padding="md">
          <Text variant="small">
            Previewing draft CMS content. Public visitors cannot see this version.
          </Text>
          <form action={exitPreview}>
            <Button size="sm" type="submit" variant="secondary">
              Exit preview
            </Button>
          </form>
        </Cluster>
      </Container>
    </Surface>
  )
}

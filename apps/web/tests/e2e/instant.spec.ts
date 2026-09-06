import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

test('the shared news shell commits during soft navigation', async ({ page }) => {
  await page.goto('/')
  const link = page.getByRole('link', { name: 'Visit the newsroom', exact: true })
  await link.scrollIntoViewIfNeeded()
  await instant(page, async () => {
    await link.click()
    await expect(page.getByTestId('news-shell')).toBeVisible()
  })
})

test('a story card prefetches the shared story shell without URL-specific content', async ({
  page,
}) => {
  await page.goto('/news')
  const story = page.getByRole('link', { name: /A clearer way to begin a shipment enquiry/ })
  await instant(page, async () => {
    await story.click()
    await expect(page.getByTestId('story-shell')).toBeVisible()
  })
})

test('the URL-independent story shell is served on initial load', async ({ page, baseURL }) => {
  const url = `${baseURL}/news/a-clearer-way-to-begin-a-shipment-enquiry`
  await instant(
    page,
    async () => {
      await page.goto(url)
      await expect(page.getByTestId('story-shell')).toBeVisible()
    },
    { baseURL: new URL(url).origin },
  )
})

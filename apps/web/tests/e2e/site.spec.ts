import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const route of ['/', '/news']) {
  test(`${route} is accessible`, async ({ page }) => {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
}

test('a reader can reach a seeded story', async ({ page }) => {
  await page.goto('/news')
  await page
    .getByRole('link', { name: /^Read / })
    .first()
    .click()
  await expect(page.getByTestId('story-shell')).toBeVisible()
  await expect(page.getByRole('article')).toBeVisible()
})

test('managed page links preserve the canonical locale during soft navigation', async ({
  page,
}) => {
  await page.goto('/en')
  const favicon = await page.request.get('/favicon.ico')
  const link = page.getByRole('link', { name: 'Read Ways of working' })

  expect(favicon.ok()).toBe(true)
  expect(favicon.headers()['content-type']).toContain('image/svg+xml')
  await expect(link).toHaveAttribute('href', '/en/company/ways-of-working')
  await link.click()

  await expect(page).toHaveURL(/\/en\/company\/ways-of-working$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Ways of working' })).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Shipping, made clearer.' }),
  ).toHaveCount(0)
})

test('unknown stories render the editorial 404', async ({ page }) => {
  await page.goto('/news/not-a-real-story')
  await expect(
    page.getByRole('heading', { name: 'That story is not in the edition.' }),
  ).toBeVisible()
})

test('the seeded CMS SEO data reaches public metadata and crawler routes', async ({ page }) => {
  await page.goto('/en')
  await expect(page).toHaveTitle('Shipping, made clearer')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en$/)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /CMS-managed service paths/,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/api\/media\/homepage-hero-/,
  )

  const [robots, sitemap] = await Promise.all([
    page.request.get('/robots.txt'),
    page.request.get('/sitemap.xml'),
  ])
  expect(await robots.text()).toContain('Sitemap:')
  const sitemapText = await sitemap.text()
  expect(sitemapText).toContain('/en/shipping/ocean-freight')
  expect(sitemapText).toContain('hreflang="ja"')
  expect(sitemapText).toContain('/ja/shipping/ocean-freight')
  expect(sitemapText).not.toContain('/jp/')

  const spainStory = sitemapText
    .split('<url>')
    .find((entry) => entry.includes('/en/news/es-local-editorial-brief?country=ES'))
  expect(spainStory).toBeDefined()
  expect(spainStory).toContain('hreflang="es"')
  expect(spainStory).not.toContain('hreflang="ja"')
})

test('Japanese uses the canonical ja locale and human-readable labels', async ({ page }) => {
  await page.goto('/ja/news?country=JP')

  await expect(page).toHaveURL(/\/ja\/news\?country=JP$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja-JP')
  const menuButton = page.getByRole('button', { name: 'Open navigation menu' })
  if (await menuButton.isVisible()) await menuButton.click()
  await expect(page.getByRole('button', { name: /日本語/ })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Japan', exact: true })).toBeVisible()
  await expect(page.getByText('JP local Dispatch update', { exact: true })).toHaveCount(0)
})

test('localized content never falls back to another language', async ({ page }) => {
  await page.goto('/ja/news/es-local-editorial-brief?country=ES')

  await expect(
    page.getByRole('heading', { name: 'That story is not in the edition.' }),
  ).toBeVisible()
  await expect(page.getByText('Spain local editorial brief', { exact: true })).toHaveCount(0)
})

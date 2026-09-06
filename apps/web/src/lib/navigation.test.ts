import { describe, expect, it } from 'vitest'

import { localizedHref } from './navigation'

describe('localizedHref', () => {
  it('prefixes locale-neutral internal links', () => {
    expect(localizedHref('ja', '/company/ways-of-working')).toBe('/ja/company/ways-of-working')
    expect(localizedHref('es', '/news?country=ES')).toBe('/es/news?country=ES')
  })

  it('keeps homepage fragments on the canonical locale route', () => {
    expect(localizedHref('en', '/#enquiry')).toBe('/en#enquiry')
  })

  it('leaves external links unchanged', () => {
    expect(localizedHref('en', 'https://example.com')).toBe('https://example.com')
  })
})

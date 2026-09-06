import { describe, expect, it } from 'vitest'

import { contactInputSchema, flattenFormErrors, newsletterInputSchema } from './forms'

describe('public form contracts', () => {
  it('accepts a complete contact submission', () => {
    const result = contactInputSchema.safeParse({
      consent: true,
      email: 'reader@example.com',
      message: 'I would like to learn more about your newsroom.',
      name: 'Avery Reader',
      organization: '',
      requestType: 'general',
      website: '',
    })

    expect(result.success).toBe(true)
  })

  it('requires route details for quote requests', () => {
    const result = contactInputSchema.safeParse({
      consent: true,
      email: 'reader@example.com',
      message: 'Please share a demonstration quote for this example shipment.',
      name: 'Avery Reader',
      organization: 'Example Co.',
      requestType: 'quote',
      website: '',
    })

    expect(result.success).toBe(false)
  })

  it('rejects honeypot content', () => {
    const result = newsletterInputSchema.safeParse({
      consent: true,
      email: 'reader@example.com',
      website: 'https://spam.invalid',
    })

    expect(result.success).toBe(false)
  })

  it('returns field errors from the supported Zod formatter', () => {
    const result = newsletterInputSchema.safeParse({
      consent: false,
      email: 'not-an-email',
      website: '',
    })

    if (result.success) throw new Error('Expected invalid newsletter input')

    const fieldErrors = flattenFormErrors(result.error)
    expect(fieldErrors.consent).toBeDefined()
    expect(fieldErrors.email).toEqual(['Enter a valid email address.'])
  })
})

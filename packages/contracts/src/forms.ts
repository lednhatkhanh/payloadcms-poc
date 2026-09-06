import { z } from 'zod'

const honeypotSchema = z.string().max(0).optional().default('')

export const contactRequestTypes = ['general', 'quote', 'shipment'] as const

export type ContactRequestType = (typeof contactRequestTypes)[number]

export function isContactRequestType(value: unknown): value is ContactRequestType {
  return value === 'general' || value === 'quote' || value === 'shipment'
}

const serviceSchema = z.enum(['ocean-freight', 'logistics-solutions'])

export const contactInputSchema = z
  .object({
    consent: z.literal(true, { error: 'Please confirm that we may store your message.' }),
    destination: z.string().trim().max(120).optional().default(''),
    email: z.email('Enter a valid email address.').max(200),
    message: z.string().trim().min(20, 'Tell us a little more.').max(2_000),
    name: z.string().trim().min(2, 'Enter your name.').max(100),
    organization: z.string().trim().max(150).optional().default(''),
    origin: z.string().trim().max(120).optional().default(''),
    requestType: z.enum(contactRequestTypes),
    service: serviceSchema.optional(),
    shipmentReference: z.string().trim().max(80).optional().default(''),
    website: honeypotSchema,
  })
  .superRefine((data, context) => {
    if (data.requestType === 'quote') {
      if (!data.service) {
        context.addIssue({
          code: 'custom',
          message: 'Choose the service you are pricing.',
          path: ['service'],
        })
      }
      if (data.origin.length < 2) {
        context.addIssue({
          code: 'custom',
          message: 'Tell us where the shipment begins.',
          path: ['origin'],
        })
      }
      if (data.destination.length < 2) {
        context.addIssue({
          code: 'custom',
          message: 'Tell us where the shipment is going.',
          path: ['destination'],
        })
      }
    }

    if (data.requestType === 'shipment' && data.shipmentReference.length < 4) {
      context.addIssue({
        code: 'custom',
        message: 'Enter the shipment or booking reference.',
        path: ['shipmentReference'],
      })
    }
  })

export const newsletterInputSchema = z.object({
  consent: z.literal(true, { error: 'Please confirm that you want to subscribe.' }),
  email: z.email('Enter a valid email address.').max(200),
  source: z.string().trim().max(100).optional().default('website-footer'),
  website: honeypotSchema,
})

export type ContactInput = z.infer<typeof contactInputSchema>
export type NewsletterInput = z.infer<typeof newsletterInputSchema>

export type FormFieldErrors = Readonly<Record<string, readonly string[]>>

export type FormResult =
  | { readonly ok: true; readonly message: string }
  | {
      readonly ok: false
      readonly message: string
      readonly fieldErrors: FormFieldErrors
    }

export function flattenFormErrors(error: z.ZodError): FormFieldErrors {
  return z.flattenError(error).fieldErrors
}

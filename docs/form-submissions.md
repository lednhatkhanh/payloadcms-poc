# Form submissions

The public site offers three enquiry paths in one guided form:

- General contact
- Quote request, including service, origin, and destination
- Shipment question, including a shipment or booking reference

The footer newsletter form stores editorial subscriptions separately.

## Access model

Public visitors submit through the web route handlers. The handlers validate the shared Zod contracts and create records with server authority; public callers never receive Payload credentials or read access.

Only users with the `operations` role and administrators can see, update, or delete `Contact submissions` and `Newsletter signups` in Payload Admin. Editorial roles cannot access this personal data.

The seeded operations login is `operations@dispatch.demo` with the standard demo password, `Abc123@@`.

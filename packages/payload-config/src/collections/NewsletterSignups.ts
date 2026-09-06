import type { CollectionConfig } from 'payload'

import { formDataManager, isFormDataManager } from '../access'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  access: {
    admin: ({ req }) => isFormDataManager(req.user),
    create: formDataManager,
    delete: formDataManager,
    read: formDataManager,
    update: formDataManager,
  },
  admin: {
    defaultColumns: ['email', 'source', 'createdAt'],
    group: 'Submissions',
    useAsTitle: 'email',
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'source', type: 'text', required: true, defaultValue: 'website-footer' },
    { name: 'consent', type: 'checkbox', required: true },
  ],
  timestamps: true,
}

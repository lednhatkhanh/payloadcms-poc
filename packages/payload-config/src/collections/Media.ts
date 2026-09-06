import type { CollectionConfig } from 'payload'

import { countryMember, publicRead } from '../access'
import { countryField, enforceCountryMembership } from '../country'
import { mediaDirectory } from '../paths'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: countryMember,
    delete: countryMember,
    read: publicRead,
    update: countryMember,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    useAsTitle: 'alt',
  },
  fields: [countryField(true), { name: 'alt', type: 'text', localized: true, required: true }],
  hooks: { beforeChange: [enforceCountryMembership] },
  upload: {
    imageSizes: [
      { name: 'card', width: 768, height: 432, fit: 'cover' },
      { name: 'hero', width: 1440, height: 810, fit: 'cover' },
    ],
    mimeTypes: ['image/*'],
    staticDir: mediaDirectory,
  },
}

import {
  slugField,
  type CollectionAfterChangeHook,
  type CollectionAfterDeleteHook,
  type CollectionConfig,
} from 'payload'

import { countryMember, publishedCountryContentOrMember } from '../access'
import { countryField, enforceCountryMembership } from '../country'
import { revalidatePublicContent } from '../revalidation'

const revalidateLocations: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidatePublicContent(['locations'])
  return doc
}

const revalidateDeletedLocation: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidatePublicContent(['locations'])
  return doc
}

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: countryMember,
    delete: countryMember,
    read: publishedCountryContentOrMember,
    update: countryMember,
  },
  admin: {
    defaultColumns: ['title', 'city', 'countryName', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    countryField(true),
    { name: 'title', type: 'text', localized: true, required: true },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 320,
      admin: { description: 'Editorial description only; do not imply operational coverage.' },
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Lead image shown on the public card and detail page.' },
    },
    {
      name: 'serviceTags',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Ocean freight', value: 'ocean-freight' },
        { label: 'Logistics solutions', value: 'logistics-solutions' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'city', type: 'text', required: true, admin: { position: 'sidebar' } },
    { name: 'countryName', type: 'text', required: true, admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [revalidateLocations],
    afterDelete: [revalidateDeletedLocation],
    beforeChange: [enforceCountryMembership],
  },
  timestamps: true,
  versions: { drafts: { autosave: true } },
}

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

import { administrator, publicRead } from '../access'
import type { Country } from '../generated/payload-types'
import { contentLocaleLabels, contentLocales } from '../locales'
import { revalidatePublicContent } from '../revalidation'

const revalidateCountryContent: CollectionAfterChangeHook<Country> = async ({ doc }) => {
  await revalidatePublicContent(['countries', 'news'])
  return doc
}

const revalidateDeletedCountryContent: CollectionAfterDeleteHook<Country> = async ({ doc }) => {
  await revalidatePublicContent(['countries', 'news'])
  return doc
}

export const Countries: CollectionConfig = {
  slug: 'countries',
  access: {
    create: administrator,
    delete: administrator,
    read: publicRead,
    update: administrator,
  },
  admin: {
    defaultColumns: ['name', 'code', 'defaultLocale', 'updatedAt'],
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [revalidateCountryContent],
    afterDelete: [revalidateDeletedCountryContent],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', index: true, required: true, unique: true },
    {
      name: 'supportedLocales',
      type: 'select',
      hasMany: true,
      options: contentLocales.map((locale) => ({
        label: contentLocaleLabels[locale],
        value: locale,
      })),
      required: true,
    },
    {
      name: 'defaultLocale',
      type: 'select',
      options: contentLocales.map((locale) => ({
        label: contentLocaleLabels[locale],
        value: locale,
      })),
      required: true,
    },
  ],
  timestamps: true,
}

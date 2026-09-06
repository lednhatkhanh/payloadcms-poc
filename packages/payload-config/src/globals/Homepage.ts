import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { authenticated, publicGlobalRead } from '../access'
import { revalidatePublicContent } from '../revalidation'

const revalidateHomepage: GlobalAfterChangeHook = async ({ doc }) => {
  await revalidatePublicContent(['homepage'])
  return doc
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: publicGlobalRead,
    update: ({ req }) => authenticated({ req }),
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, required: true },
    { name: 'heroTitle', type: 'text', localized: true, required: true },
    { name: 'heroBody', type: 'textarea', localized: true, required: true },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Lead image shown in the public homepage hero.' },
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'aboutTitle', type: 'text', localized: true, required: true },
    { name: 'aboutBody', type: 'textarea', localized: true, required: true },
    {
      name: 'featuredNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 3,
    },
    { name: 'contactTitle', type: 'text', localized: true, required: true },
    { name: 'contactBody', type: 'textarea', localized: true, required: true },
    { name: 'newsletterTitle', type: 'text', localized: true, required: true },
    { name: 'newsletterBody', type: 'textarea', localized: true, required: true },
  ],
  hooks: { afterChange: [revalidateHomepage] },
  versions: { drafts: { autosave: true } },
}

import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { authenticated, publicGlobalRead } from '../access'
import { revalidatePublicContent } from '../revalidation'

const revalidateSeoSettings: GlobalAfterChangeHook = async ({ doc }) => {
  await revalidatePublicContent(['seo'])
  return doc
}

export const SeoSettings: GlobalConfig = {
  slug: 'seo-settings',
  access: {
    read: publicGlobalRead,
    update: ({ req }) => authenticated({ req }),
  },
  admin: {
    description:
      'Site-wide SEO defaults. Canonical URLs are derived from the public route so they stay consistent.',
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      admin: { description: 'Used in page-title templates and social sharing metadata.' },
    },
    {
      name: 'defaultTitle',
      type: 'text',
      localized: true,
      required: true,
      maxLength: 60,
      admin: { description: 'Default title for listing pages and records without an SEO title.' },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 160,
      admin: {
        description:
          'Default description for search results and social cards. Aim for 120–160 characters.',
      },
    },
    {
      name: 'defaultSocialImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Used when a page has no SEO image selected.' },
    },
    {
      name: 'twitterSite',
      type: 'text',
      maxLength: 50,
      admin: { description: 'Optional X/Twitter account, including the @ symbol.' },
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      admin: { description: 'Optional Google Search Console verification token.' },
    },
    {
      name: 'allowIndexing',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      admin: {
        description:
          'Turn off only for a non-public preview environment. This also updates robots.txt and page metadata.',
      },
    },
  ],
  hooks: { afterChange: [revalidateSeoSettings] },
}

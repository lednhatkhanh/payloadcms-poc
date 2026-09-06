import { postgresAdapter } from '@payloadcms/db-postgres'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { serverEnvironment } from '@repo/contracts/env'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Countries } from './collections/Countries'
import { EditorialActivities } from './collections/EditorialActivities'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { NewsletterSignups } from './collections/NewsletterSignups'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { isGlobalAccount } from './access'
import { Homepage } from './globals/Homepage'
import { SeoSettings } from './globals/SeoSettings'
import { contentLocales, defaultContentLocale } from './locales'
import { publishScheduledContent } from './scheduledPublishing'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
export default buildConfig({
  admin: {
    components: {
      afterNavLinks: ['./admin/WorkflowNavLink#WorkflowNavLink'],
      graphics: {
        Icon: './admin/Logo#Icon',
        Logo: './admin/Logo#Logo',
      },
      views: {
        workflow: {
          Component: './admin/WorkflowInbox#WorkflowInboxView',
          path: '/workflow',
        },
      },
    },
    importMap: { baseDir: currentDirectory },
    meta: { titleSuffix: '— The Dispatch' },
    theme: 'light',
    user: Users.slug,
  },
  collections: [
    Users,
    Countries,
    Media,
    News,
    Locations,
    Pages,
    EditorialActivities,
    ContactSubmissions,
    NewsletterSignups,
  ],
  db: postgresAdapter({
    pool: { connectionString: serverEnvironment.DATABASE_URL },
    push: false,
  }),
  editor: lexicalEditor(),
  globals: [Homepage, SeoSettings],
  localization: {
    defaultLocale: defaultContentLocale,
    fallback: false,
    locales: [...contentLocales],
  },
  jobs: {
    autoRun: [{ cron: '* * * * *', limit: 10, queue: 'scheduled-publication' }],
    tasks: [publishScheduledContent],
  },
  maxDepth: 2,
  plugins: [
    seoPlugin({
      collections: ['locations', 'news', 'pages'],
      globals: ['homepage'],
      tabbedUI: true,
      uploadsCollection: 'media',
    }),
    multiTenantPlugin({
      collections: {
        locations: { customTenantField: true },
        media: { customTenantField: true },
        news: { customTenantField: true, useBaseFilter: false, useTenantAccess: false },
      },
      tenantField: { name: 'country' },
      tenantSelectorLabel: 'Country',
      tenantsArrayField: {
        arrayFieldName: 'countries',
        arrayTenantFieldName: 'country',
      },
      tenantsSlug: Countries.slug,
      userHasAccessToAllTenants: isGlobalAccount,
    }),
  ],
  secret: serverEnvironment.PAYLOAD_SECRET,
  serverURL: serverEnvironment.PAYLOAD_PUBLIC_SERVER_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(currentDirectory, 'generated/payload-types.ts'),
  },
  upload: {
    limits: { fileSize: 8_000_000 },
  },
})

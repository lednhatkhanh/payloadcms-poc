import {
  slugField,
  type CollectionAfterChangeHook,
  type CollectionAfterDeleteHook,
  type CollectionConfig,
} from 'payload'

import {
  administrator,
  countryEditorialCreator,
  countryEditorialParticipant,
  publishedCountryNewsOrParticipant,
} from '../access'
import { countryField, enforceNewsCountryScope, newsScopeField } from '../country'
import type { News as NewsRecord } from '../generated/payload-types'
import { newsPreviewUrl } from '../preview'
import { revalidatePublicContent } from '../revalidation'
import {
  editorialWorkflowFields,
  enforceEditorialWorkflow,
  logEditorialActivity,
} from '../workflow'

function isPublished(news: NewsRecord): boolean {
  return news['_status'] === 'published'
}

const revalidatePublishedNews: CollectionAfterChangeHook<NewsRecord> = async ({
  doc,
  previousDoc,
}) => {
  if (isPublished(doc) || isPublished(previousDoc)) {
    await revalidatePublicContent(['news'])
  }

  return doc
}

const revalidateDeletedNews: CollectionAfterDeleteHook<NewsRecord> = async ({ doc }) => {
  if (isPublished(doc)) {
    await revalidatePublicContent(['news'])
  }

  return doc
}

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: countryEditorialCreator,
    delete: administrator,
    read: publishedCountryNewsOrParticipant,
    update: countryEditorialParticipant,
  },
  admin: {
    components: {
      edit: {
        PublishButton: '../../../apps/cms/src/components/WorkflowActionButton#WorkflowActionButton',
      },
    },
    defaultColumns: ['title', 'workflowState', '_status', 'updatedAt'],
    description:
      'Workflow: editor requests translation or review, translator submits work for review, reviewer approves or requests changes, publisher publishes.',
    livePreview: {
      breakpoints: [
        { height: 844, label: 'Phone', name: 'phone', width: 390 },
        { height: 900, label: 'Desktop', name: 'desktop', width: 1440 },
      ],
      openByDefault: true,
      url: ({ data, locale }) => {
        const id = data.id
        return typeof id === 'number' || typeof id === 'string'
          ? newsPreviewUrl(id, locale.code)
          : null
      },
    },
    preview: (data, { locale }) => {
      const id = data.id
      return typeof id === 'number' || typeof id === 'string' ? newsPreviewUrl(id, locale) : null
    },
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
  indexes: [{ fields: ['country', 'slug'], unique: true }],
  fields: [
    newsScopeField,
    countryField(),
    { name: 'title', type: 'text', localized: true, required: true },
    slugField({ disableUnique: true }),
    { name: 'excerpt', type: 'textarea', localized: true, required: true, maxLength: 320 },
    { name: 'body', type: 'richText', localized: true, required: true },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Lead image shown on the public story card and detail page.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'company',
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Product', value: 'product' },
        { label: 'People', value: 'people' },
        { label: 'Ideas', value: 'ideas' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    ...editorialWorkflowFields,
  ],
  hooks: {
    afterChange: [revalidatePublishedNews, logEditorialActivity('news')],
    afterDelete: [revalidateDeletedNews],
    beforeChange: [enforceNewsCountryScope, enforceEditorialWorkflow],
  },
  timestamps: true,
  versions: { drafts: { autosave: true } },
}

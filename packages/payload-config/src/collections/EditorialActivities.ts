import type { CollectionConfig } from 'payload'

import { administrator } from '../access'

export const EditorialActivities: CollectionConfig = {
  slug: 'editorial-activities',
  access: {
    create: administrator,
    delete: administrator,
    read: administrator,
    update: administrator,
  },
  admin: {
    defaultColumns: ['title', 'action', 'actor', 'createdAt'],
    group: 'Editorial workflow',
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'collection',
      type: 'select',
      options: [
        { label: 'News story', value: 'news' },
        { label: 'Page', value: 'pages' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'documentId', type: 'number', required: true, admin: { position: 'sidebar' } },
    {
      name: 'action',
      type: 'select',
      options: [
        { label: 'Created', value: 'created' },
        { label: 'Translation requested', value: 'translation-requested' },
        { label: 'Translations submitted', value: 'translations-submitted' },
        { label: 'Review requested', value: 'review-requested' },
        { label: 'Changes requested', value: 'changes-requested' },
        { label: 'Approved', value: 'approved' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'workflowState',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Translation requested', value: 'translation-requested' },
        { label: 'In review', value: 'in-review' },
        { label: 'Changes requested', value: 'changes-requested' },
        { label: 'Approved', value: 'approved' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'scheduledFor',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar', readOnly: true },
    },
    { name: 'note', type: 'textarea', maxLength: 320, admin: { readOnly: true } },
  ],
  timestamps: true,
}

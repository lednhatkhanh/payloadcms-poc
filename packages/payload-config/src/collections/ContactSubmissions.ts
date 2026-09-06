import type { CollectionConfig } from 'payload'

import { formDataManager, isFormDataManager } from '../access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    admin: ({ req }) => isFormDataManager(req.user),
    create: formDataManager,
    delete: formDataManager,
    read: formDataManager,
    update: formDataManager,
  },
  admin: {
    defaultColumns: ['requestType', 'name', 'email', 'status', 'createdAt'],
    group: 'Submissions',
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'requestType',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General contact', value: 'general' },
        { label: 'Quote request', value: 'quote' },
        { label: 'Shipment question', value: 'shipment' },
      ],
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'organization', type: 'text' },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Ocean freight', value: 'ocean-freight' },
        { label: 'Logistics solutions', value: 'logistics-solutions' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.requestType === 'quote',
        position: 'sidebar',
      },
    },
    {
      name: 'origin',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData.requestType === 'quote' },
    },
    {
      name: 'destination',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData.requestType === 'quote' },
    },
    {
      name: 'shipmentReference',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData.requestType === 'shipment' },
    },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consent', type: 'checkbox', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

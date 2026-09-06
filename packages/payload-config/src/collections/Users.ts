import type { CollectionConfig } from 'payload'

import { administrator, authenticated, isAdministrator, selfOrAdministrator } from '../access'
import { editorialRoles } from '../workflow'

const accountRoles = [...editorialRoles, 'operations'] as const

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
    useAsTitle: 'email',
  },
  access: {
    create: administrator,
    delete: administrator,
    read: authenticated,
    update: selfOrAdministrator,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'globalAccess',
      type: 'checkbox',
      defaultValue: false,
      saveToJWT: true,
      access: { update: ({ req }) => isAdministrator(req.user) },
      admin: {
        description: 'Global accounts can work across every country.',
        position: 'sidebar',
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: accountRoles.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
      access: { update: ({ req }) => isAdministrator(req.user) },
      admin: {
        description:
          'Use one clear responsibility per demo account: editorial roles, operations, or admin.',
        position: 'sidebar',
      },
    },
  ],
}

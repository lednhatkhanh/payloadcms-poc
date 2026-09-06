import type { CollectionBeforeChangeHook, Field, RelationshipField } from 'payload'

import { countryIdsForUser, isGlobalAccount } from './access'

type RelationshipValue = number | string | { readonly id: number | string } | null | undefined

function relationshipId(value: RelationshipValue): number | string | undefined {
  if (typeof value === 'number' || typeof value === 'string') return value
  return value?.id
}

function scopeValue(value: unknown): 'country' | 'global' | undefined {
  return value === 'country' || value === 'global' ? value : undefined
}

function isNewsDraft(
  data: Record<string, unknown>,
  originalDoc: Record<string, unknown> | undefined,
): boolean {
  return (
    data['_status'] === 'draft' ||
    (data['_status'] === undefined && originalDoc?.['_status'] === 'draft')
  )
}

export function countryField(required = false): RelationshipField {
  return {
    name: 'country',
    type: 'relationship',
    relationTo: 'countries',
    index: true,
    required,
    admin: {
      description: 'Country that owns this local content.',
      position: 'sidebar',
    },
    filterOptions: ({ req }) => {
      if (!req.user || isGlobalAccount(req.user)) return true
      return { id: { in: countryIdsForUser(req.user) } }
    },
  }
}

export const newsScopeField: Field = {
  name: 'scope',
  type: 'select',
  defaultValue: 'country',
  options: [
    { label: 'Global', value: 'global' },
    { label: 'Country', value: 'country' },
  ],
  required: true,
  admin: { position: 'sidebar' },
}

export const enforceCountryMembership: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  req,
}) => {
  if (!req.user || isGlobalAccount(req.user)) return data

  const country = relationshipId(
    (data.country as RelationshipValue) ?? (originalDoc?.country as RelationshipValue),
  )
  if (country === undefined || !countryIdsForUser(req.user).includes(country)) {
    throw new Error('Choose a country assigned to your account.')
  }
  return data
}

export const enforceNewsCountryScope: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!req.user) return data

  const scope = scopeValue(data.scope) ?? scopeValue(originalDoc?.scope)
  if (!scope) {
    if (operation !== 'create') {
      throw new Error('Choose whether this news story is global or country-specific.')
    }

    if (isGlobalAccount(req.user)) {
      data.country = undefined
      data.scope = 'global'
      return data
    }

    const country = countryIdsForUser(req.user)[0]
    if (country === undefined) throw new Error('Choose a country assigned to your account.')
    data.country = country
    data.scope = 'country'
    return data
  }

  if (scope === 'global') {
    if (!isGlobalAccount(req.user)) {
      throw new Error('Only global accounts can create or update global news stories.')
    }
    data.country = undefined
    return data
  }

  const country = relationshipId(
    (data.country as RelationshipValue) ?? (originalDoc?.country as RelationshipValue),
  )
  if (country === undefined && isNewsDraft(data, originalDoc)) {
    return data
  }
  if (country === undefined) throw new Error('Choose a country for country news.')
  if (!isGlobalAccount(req.user) && !countryIdsForUser(req.user).includes(country)) {
    throw new Error('Choose a country assigned to your account.')
  }
  return data
}
